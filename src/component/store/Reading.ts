import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import {asyncAction} from "mobx-utils";
import _ from "lodash";
import api from '../../api';

useStrict(true) // don't allow state modifications outside actions

export enum ViewMode{
    view,
    edit
}
enum RemarkType {
    Word,
    Sentance,
    Unknown
}
interface iRemark {
    _id: string,
    text: string,
    remark: string,
    selectionElemementsData?: any
    start?: number
    end?: number
    type?: RemarkType

    book_id?: string,
    paragraph_id?: string,
    relatedRemarks?: Array<any>

}

export default class Reading {


    constructor() {
        // this.currentCommit={}
    }
    @observable viewMode:ViewMode

    @action
    setViewMode(v:ViewMode){
        this.viewMode =v;
    }


    @action
    deActive() {
        if (this.currentCommit) {
            _.map(this.currentCommit.selectionElemementsData, element => {
                element.isActive = false;
            });
        }
    }

    @action
    async saveCommit() {
        if (this.currentCommit) {

            //exec only add remark
            if (!this.currentCommit._id) {
                _.map(this.currentCommit.selectionElemementsData, (el) => {
                    el.isSelected++;
                })
            }

            let rst = await api.post('/editRemark', this.currentCommit);
            if (rst.data.code === 1) {

                this.viewMode =ViewMode.view;
                return this.currentCommit;
            } else {
                return null;
            }

        }

    }


    @action
    setCurrentRemark(html) {
        if (this.currentCommit)
            this.currentCommit.remark = html;
    }


    @action
    async setCurrent(text: string, selectionElemementsData: any, index: { start: number, end: number }, book_id, paragraph_id, remark) {
        this.currentCommit.text = text
        this.currentCommit.remark = '';
        this.currentCommit.selectionElemementsData = selectionElemementsData;
        this.currentCommit.start = index.start;
        this.currentCommit.end = index.end;
        this.currentCommit.type = RemarkType.Word
        this.currentCommit.book_id = book_id;
        this.currentCommit.paragraph_id = paragraph_id;
        this.currentCommit._id = '';

        let rst = await api.post('/getRemarksByPosOfParagraph', {
            book_id,
            paragraph_id,
            start: index.start,
            end: index.end
        });

        runInAction(() => {

            var relatedRemarks = rst.data.data;
            if (relatedRemarks && relatedRemarks.length > 0) {
                var selectedRemark = _.find(relatedRemarks, (r) => r.start === this.currentCommit.start && r.end === this.currentCommit.end);
                if (selectedRemark) {
                    this.currentCommit.remark = selectedRemark.remark;
                    this.currentCommit._id = selectedRemark._id;
                }
                this.currentCommit.relatedRemarks =  _.filter(relatedRemarks, (r) => !(r.start === this.currentCommit.start && r.end === this.currentCommit.end));
            } else {
                this.currentCommit.relatedRemarks = [];
            }

            this.viewMode = this.currentCommit._id?ViewMode.view:ViewMode.edit;
            // console.log(this.currentCommit.relatedRemarks);
        })


    }


    @observable currentCommit: iRemark = {
        _id: '',
        text: '',
        remark: '',
        type: RemarkType.Unknown,
        relatedRemarks: []

    }


}