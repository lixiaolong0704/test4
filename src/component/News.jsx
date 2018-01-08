"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = require("antd");
var editor_1 = require("./editor");
var React = require("react");
var FormItem = antd_1.Form.Item;
var Option = antd_1.Select.Option;
var AutoCompleteOption = antd_1.AutoComplete.Option;
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var MBlock_1 = require("./MBlock");
var Reading_1 = require("./store/Reading");
var Reading_2 = require("./store/Reading");
var axios_1 = require("axios");
var reading = new Reading_1.default();
var News = /** @class */ (function (_super) {
    __extends(News, _super);
    function News() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.book = {};
        return _this;
    }
    Object.defineProperty(News.prototype, "hasParagraphs", {
        get: function () {
            return (this.book && this.book.paragraphs);
        },
        enumerable: true,
        configurable: true
    });
    News.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rst, book_1, rst_1, group_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get('http://localhost:4000/getBookById')];
                    case 1:
                        rst = _a.sent();
                        if (!(rst.data.code === 1)) return [3 /*break*/, 3];
                        book_1 = rst.data.data;
                        if (!(book_1 && book_1.paragraphs)) return [3 /*break*/, 3];
                        return [4 /*yield*/, axios_1.default.post('http://localhost:4000/getRemarksByParagraphIds', {
                                book_id: book_1._id,
                                paragraph_ids: book_1.paragraphs.map(function (p) { return p._id; }).join(".")
                            })];
                    case 2:
                        rst_1 = _a.sent();
                        if (rst_1.data.code === 1) {
                            group_1 = rst_1.data.data;
                            book_1.paragraphs.map(function (p) {
                                var r = group_1[p._id];
                                p.remarks = r ? r : null;
                            });
                            mobx_1.runInAction(function () {
                                _this.book = book_1;
                            });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    News.prototype.saveCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, reading.saveCommit()];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    News.prototype.render = function () {
        // var blocks = [];
        // for (var i = 0; i < 3; i++) {
        //     blocks.push(<MBlock key={i} content={''}></MBlock>);
        //}
        var _this = this;
        // console.log(this.book);
        var blocks = (this.hasParagraphs) ?
            this.book.paragraphs.map(function (p) { return <MBlock_1.default default_remarks={p.remarks} book_id={_this.book._id} paragraph_id={p._id} key={p._id} content={p.en_content}></MBlock_1.default>; }) :
            [];
        // var viewMode = reading.currentCommit._id?ViewMode.view
        return (<mobx_react_1.Provider reading={reading}>
                <antd_1.Row>
                    <antd_1.Col span={12}>
                        <div>{this.book.cn_name}</div>
                        <div>{this.book.en_name}</div>
                        <div className='canvas-reader'>
                            {blocks}
                        </div>
                    </antd_1.Col>
                    <antd_1.Col span={12}>
                        <div>{reading.currentCommit.text}</div>

                        {reading.viewMode === Reading_2.ViewMode.view ?
            <antd_1.Card onClick={function () { return reading.setViewMode(Reading_2.ViewMode.edit); }} style={{ width: 300 }}><p dangerouslySetInnerHTML={{ __html: reading.currentCommit.remark }}></p></antd_1.Card> :
            <div>

                                    <editor_1.default value={reading.currentCommit.remark} onChange={function (html) { return reading.setCurrentRemark(html); }}></editor_1.default>

                                    <antd_1.Button type="primary" onClick={this.saveCommit.bind(this)} htmlType="submit">save</antd_1.Button>
                                </div>}


                        <antd_1.List itemLayout="horizontal" dataSource={reading.currentCommit.relatedRemarks} renderItem={function (item) { return (<antd_1.List.Item>
                                    <antd_1.List.Item.Meta avatar={<antd_1.Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>} title={<a href="https://ant.design">{item.text}</a>} description={<div dangerouslySetInnerHTML={{ __html: item.remark }}></div>}/>
                                </antd_1.List.Item>); }}/>
                    </antd_1.Col>
                </antd_1.Row>
            </mobx_react_1.Provider>);
    };
    __decorate([
        mobx_1.observable
    ], News.prototype, "book", void 0);
    __decorate([
        mobx_1.computed
    ], News.prototype, "hasParagraphs", null);
    News = __decorate([
        mobx_react_1.observer
    ], News);
    return News;
}(React.Component));
exports.default = News;
