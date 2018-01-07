"use strict";
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
var mobx_1 = require("mobx");
var lodash_1 = require("lodash");
var axios_1 = require("axios");
mobx_1.useStrict(true); // don't allow state modifications outside actions
var RemarkType;
(function (RemarkType) {
    RemarkType[RemarkType["Word"] = 0] = "Word";
    RemarkType[RemarkType["Sentance"] = 1] = "Sentance";
    RemarkType[RemarkType["Unknown"] = 2] = "Unknown";
})(RemarkType || (RemarkType = {}));
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["view"] = 0] = "view";
    ViewMode[ViewMode["edit"] = 1] = "edit";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var Reading = /** @class */ (function () {
    function Reading() {
        this.currentCommit = {
            _id: '',
            text: '',
            remark: '',
            type: RemarkType.Unknown,
            relatedRemarks: []
        };
        // this.currentCommit={}
    }
    Reading.prototype.setViewMode = function (v) {
        this.viewMode = v;
    };
    Reading.prototype.deActive = function () {
        if (this.currentCommit) {
            lodash_1.default.map(this.currentCommit.selectionElemementsData, function (element) {
                element.isActive = false;
            });
        }
    };
    Reading.prototype.saveCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.currentCommit) return [3 /*break*/, 2];
                        //exec only add remark
                        if (!this.currentCommit._id) {
                            lodash_1.default.map(this.currentCommit.selectionElemementsData, function (el) {
                                el.isSelected++;
                            });
                        }
                        return [4 /*yield*/, axios_1.default.post('http://localhost:4000/editRemark', this.currentCommit)];
                    case 1:
                        rst = _a.sent();
                        if (rst.data.code === 1) {
                            this.viewMode = ViewMode.view;
                            return [2 /*return*/, this.currentCommit];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Reading.prototype.setCurrentRemark = function (html) {
        if (this.currentCommit)
            this.currentCommit.remark = html;
    };
    Reading.prototype.setCurrent = function (text, selectionElemementsData, index, book_id, paragraph_id, remark) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var rst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.currentCommit.text = text;
                        this.currentCommit.remark = '';
                        this.currentCommit.selectionElemementsData = selectionElemementsData;
                        this.currentCommit.start = index.start;
                        this.currentCommit.end = index.end;
                        this.currentCommit.type = RemarkType.Word;
                        this.currentCommit.book_id = book_id;
                        this.currentCommit.paragraph_id = paragraph_id;
                        this.currentCommit._id = '';
                        return [4 /*yield*/, axios_1.default.post('http://localhost:4000/getRemarksByPosOfParagraph', {
                                book_id: book_id,
                                paragraph_id: paragraph_id,
                                start: index.start,
                                end: index.end
                            })];
                    case 1:
                        rst = _a.sent();
                        mobx_1.runInAction(function () {
                            var relatedRemarks = rst.data.data;
                            if (relatedRemarks && relatedRemarks.length > 0) {
                                var selectedRemark = lodash_1.default.find(relatedRemarks, function (r) { return r.start === _this.currentCommit.start && r.end === _this.currentCommit.end; });
                                if (selectedRemark) {
                                    _this.currentCommit.remark = selectedRemark.remark;
                                    _this.currentCommit._id = selectedRemark._id;
                                }
                                _this.currentCommit.relatedRemarks = lodash_1.default.filter(relatedRemarks, function (r) { return !(r.start === _this.currentCommit.start && r.end === _this.currentCommit.end); });
                            }
                            else {
                                _this.currentCommit.relatedRemarks = [];
                            }
                            _this.viewMode = _this.currentCommit._id ? ViewMode.view : ViewMode.edit;
                            // console.log(this.currentCommit.relatedRemarks);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        mobx_1.observable
    ], Reading.prototype, "viewMode", void 0);
    __decorate([
        mobx_1.action
    ], Reading.prototype, "setViewMode", null);
    __decorate([
        mobx_1.action
    ], Reading.prototype, "deActive", null);
    __decorate([
        mobx_1.action
    ], Reading.prototype, "saveCommit", null);
    __decorate([
        mobx_1.action
    ], Reading.prototype, "setCurrentRemark", null);
    __decorate([
        mobx_1.action
    ], Reading.prototype, "setCurrent", null);
    __decorate([
        mobx_1.observable
    ], Reading.prototype, "currentCommit", void 0);
    return Reading;
}());
exports.default = Reading;
