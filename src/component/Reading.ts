import {observable, computed, autorun, action} from 'mobx';
import _ from "lodash";
import axios from 'axios';

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
    paragraph_id?: string

}

export default class Reading {


    constructor() {
        // this.currentCommit={}
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
            _.map(this.currentCommit.selectionElemementsData, (el) => {
                el.isSelected++;
            })
            let rst = await axios.post('http://localhost:4000/addRemark', this.currentCommit);

            return this.currentCommit;
        }

    }


    @action
    setCurrent(text: string, selectionElemementsData: any, index: { start: number, end: number }, book_id, paragraph_id) {
        this.currentCommit.text = text
        this.currentCommit.remark = 'ffff';
        this.currentCommit.selectionElemementsData = selectionElemementsData;
        this.currentCommit.start = index.start;
        this.currentCommit.end = index.end;
        this.currentCommit.type = RemarkType.Word
        this.currentCommit.book_id = book_id;
        this.currentCommit.paragraph_id = paragraph_id;
    }


    @observable currentCommit: iRemark = {
        _id: '',
        text: '',
        remark: '',
        type: RemarkType.Unknown

    }


}