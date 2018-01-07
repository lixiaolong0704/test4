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
var React = require("react");
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var element_class_1 = require("element-class");
var classNames = require('classnames');
var uuidv1 = require('uuid/v1');
var lodash_1 = require("lodash");
var Color = require('color');
function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3)
            all.push(node);
        else
            all = all.concat(textNodesUnder(node));
    }
    return all;
}
var MBlock = /** @class */ (function (_super) {
    __extends(MBlock, _super);
    function MBlock(props) {
        var _this = _super.call(this, props) || this;
        _this.remarks = [];
        _this.isMouseDowning = false;
        return _this;
    }
    // @computed get el() {
    //     return this.price * this.amount;
    // }
    MBlock.prototype.convertHtml = function () {
        // var aaa = `As your app grows,<span style="font-weight: bold;font-size: 24px;"> you can catch</span> a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;
        // var aaa = `As your app grows,<span style="font-weight: bold"> you can catch</span> a  ng. For some applications, you can use JavaScript extensions like Flow or TypeScript to `;
        var _this = this;
        var htmlObject = this.p;
        htmlObject.innerHTML = this.props.content;
        // var sp= document.createElement('span');
        // sp.innerText='abc';
        // // htmlObject.firstChild.replaceWith(sp);
        //
        var nodes = textNodesUnder(htmlObject);
        this.elementsData = [];
        this.spans = [];
        var index = 0;
        lodash_1.default.map(nodes, function (textNode) {
            var _elementsDataOfTextNode = _this.textToElementData(textNode.nodeValue);
            // var div= document.createElement("div");
            var spans = lodash_1.default.map(_elementsDataOfTextNode, function (data) {
                data.index = index;
                var span = document.createElement("span");
                span.innerText = data.text;
                span.setAttribute("custom-index", index + "");
                span.setAttribute("class", "canvas-reader__p_el");
                data.tag = span;
                _this.elementsData.push(mobx_1.observable(data));
                index++;
                return span;
            });
            // textNode.replaceWith(tt);
            // console.log("ffff");
            textNode.replaceWith.apply(textNode, spans);
        });
        lodash_1.default.map(this.elementsData, function (dd) {
            // var aa=observable(dd);
            mobx_1.autorun(function () {
                var aa = dd;
                // console.log(aa.text + "--" + aa.isActive + "---" + aa.isSelected);
                _this.attachStyle(dd, dd.tag);
            });
        });
    };
    MBlock.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // this.loadRemarks();
                this.convertHtml();
                //after elementsData init
                this.props.default_remarks ? this.props.default_remarks.map(function (r) {
                    if (r.start === r.end) {
                        _this.elementsData[r.start].isSelected++;
                    }
                    else {
                        var c = r.start;
                        while (c <= r.end) {
                            _this.elementsData[c].isSelected++;
                            c++;
                        }
                    }
                    _this.remarks.push(r);
                }) : null;
                return [2 /*return*/];
            });
        });
    };
    MBlock.prototype.attachStyle = function (data, span) {
        var className = classNames({
            'canvas-reader__p_el': true,
            'canvas-reader__p_el_active': data.isActive,
            'canvas-reader__p_el_selected': data.isSelected
        });
        var backgroundColor = null;
        if ((!data.isActive) && (data.isSelected > 0)) {
            backgroundColor = Color('#f0f0f0').darken(0.1 * data.isSelected).rgb().toString();
        }
        // span.innerText = data.text;
        span.className = className;
        span.style.backgroundColor = backgroundColor;
        // console.log(data.text + "attch");
    };
    MBlock.prototype.textToElementData = function (myString) {
        var myRegexp = /([a-zA-Z’-]+|[\,\.,:])/g;
        var results = [];
        var match = myRegexp.exec(myString);
        var index = 0;
        while (match != null) {
            // matched text: match[0]
            // match start: match.index
            // capturing group n: match[n]
            // console.log()
            results.push({
                text: match[0].trim(),
                key: uuidv1(),
                isActive: false,
                isSelected: 0,
                index: index
            });
            index++;
            match = myRegexp.exec(myString);
        }
        return results;
    };
    MBlock.prototype.findElement = function (target) {
        var index = parseInt(target.getAttribute('custom-index'));
        return lodash_1.default.find(this.elementsData, function (e) { return e.index === index; });
    };
    MBlock.prototype.iteElements = function (downIndex, upIndex, ita, iteOther) {
        var startIndex = 0, endIndex = 0;
        if (downIndex <= upIndex) {
            startIndex = downIndex;
            endIndex = upIndex;
        }
        else {
            startIndex = upIndex;
            endIndex = downIndex;
        }
        // console.log(startIndex + "--" + endIndex);
        var isMeet = false, isOK = false;
        lodash_1.default.map(this.elementsData, function (element) {
            if (isOK) {
                iteOther(element);
                return;
            }
            if (element.index === endIndex) {
                isMeet = false;
                ita(element);
                isOK = true;
                return;
            }
            if ((element.index === startIndex) || isMeet) {
                isMeet = true;
                ita(element);
            }
            else {
                iteOther(element);
            }
        });
        return {
            start: startIndex,
            end: endIndex
        };
    };
    MBlock.prototype.onMouseDown = function (e) {
        if (element_class_1.default(e.target).has('canvas-reader__p_el')) {
            this.props.reading.deActive();
            this.end = this.start = this.findElement(e.target);
            if (this.start) {
                this.start.isActive = true;
            }
            this.isMouseDowning = true;
        }
    };
    MBlock.prototype.onMouseMove = function (e) {
        var _this = this;
        if (this.isMouseDowning && element_class_1.default(e.target).has('canvas-reader__p_el')) {
            lodash_1.default.map(this.elementsData, function (element) {
                //     element.isActive = false;
                // });
                _this.iteElements(_this.start.index, parseInt(e.target.getAttribute('custom-index')), function (element) {
                    element.isActive = true;
                }, function (el) {
                    el.isActive = false;
                });
            });
            this.end = this.findElement(e.target);
            // if (this.end) {
            //     this.end.isActive = true;
            // }
        }
    };
    MBlock.prototype.onMouseLeave = function () {
        var _this = this;
        clearTimeout(this.h);
        var closeUp = function () {
            _this.endSelect();
            _this.isMouseDowning = false;
            // _.map(this.elementsData, element => {
            //     element.isActive = false;
            // });
        };
        this.h = setTimeout(closeUp, 500);
    };
    MBlock.prototype.endSelect = function () {
        this.start = null;
        this.end = null;
    };
    MBlock.prototype.onMouseUp = function (e) {
        if (this.isMouseDowning) {
            // clearTimeout(this.h);
            // const closeUp=()=>{
            var selection = '';
            var selectionElsData = [];
            var index = this.iteElements(this.start.index, this.end.index, function (element) {
                selection += element.text + " ";
                selectionElsData.push(element);
                // element.isSelected++;
            }, function () { return 0; });
            if (this.end)
                this.props.reading.setCurrent(selection, selectionElsData, index, this.props.book_id, this.props.paragraph_id);
            this.endSelect();
        }
        this.isMouseDowning = false;
    };
    MBlock.prototype.render = function () {
        var _this = this;
        console.log(this.remarks ? this.remarks.length : 0);
        return (<p className="canvas-reader__p" onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} ref={function (p) {
            _this.p = p;
        }}>F


            </p>);
    };
    __decorate([
        mobx_1.observable
    ], MBlock.prototype, "remarks", void 0);
    __decorate([
        mobx_1.observable
    ], MBlock.prototype, "start", void 0);
    __decorate([
        mobx_1.observable
    ], MBlock.prototype, "end", void 0);
    __decorate([
        mobx_1.action
    ], MBlock.prototype, "componentDidMount", null);
    __decorate([
        mobx_1.action
    ], MBlock.prototype, "onMouseDown", null);
    __decorate([
        mobx_1.action
    ], MBlock.prototype, "onMouseMove", null);
    __decorate([
        mobx_1.action
    ], MBlock.prototype, "onMouseLeave", null);
    __decorate([
        mobx_1.action
    ], MBlock.prototype, "onMouseUp", null);
    MBlock = __decorate([
        mobx_react_1.inject("reading"),
        mobx_react_1.observer
    ], MBlock);
    return MBlock;
}(React.Component));
exports.default = MBlock;
