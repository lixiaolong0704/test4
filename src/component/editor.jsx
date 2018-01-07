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
Object.defineProperty(exports, "__esModule", { value: true });
require("draft-js/dist/Draft.css");
require("./editor.css");
var draft_js_1 = require("draft-js");
var React = require("react");
var draft_js_export_html_1 = require("draft-js-export-html");
var draft_js_import_html_1 = require("draft-js-import-html");
var MoliEditor = /** @class */ (function (_super) {
    __extends(MoliEditor, _super);
    function MoliEditor(props) {
        var _this = _super.call(this, props) || this;
        // this.state = {editorState: EditorState.createEmpty()};
        // this.onChange = (editorState:any) => this.setState({editorState});
        if (_this.props.value) {
            _this.state = {
                editorState: draft_js_1.EditorState.createWithContent(draft_js_import_html_1.stateFromHTML(_this.props.value)),
                html: _this.props.value
            };
        }
        else {
            _this.state = { editorState: draft_js_1.EditorState.createEmpty(), html: '' };
        }
        _this.focus = function () { return _this.refs.editor.focus(); };
        _this.onChange = function (editorState) {
            if (_this.state.editorState) {
                var html_1 = draft_js_export_html_1.stateToHTML(editorState.getCurrentContent());
                // const html =convertToRaw(this.state.editorState.getCurrentContent());
                _this.setState({
                    editorState: editorState,
                    html: html_1
                }, function () {
                    _this.props.onChange && _this.props.onChange(html_1);
                });
                // console.log(html);
            }
        };
        _this.handleKeyCommand = function (command) { return _this._handleKeyCommand(command); };
        _this.onTab = function (e) { return _this._onTab(e); };
        _this.toggleBlockType = function (type) { return _this._toggleBlockType(type); };
        _this.toggleInlineStyle = function (style) { return _this._toggleInlineStyle(style); };
        return _this;
    }
    MoliEditor.prototype.componentWillReceiveProps = function (np) {
        if ((this.state.html !== np.value)) {
            this.setState({
                editorState: draft_js_1.EditorState.createWithContent(draft_js_import_html_1.stateFromHTML(np.value)),
                html: np.value
            });
        }
        // if(this.state.editorState !== )
    };
    MoliEditor.prototype._handleKeyCommand = function (command) {
        var editorState = this.state.editorState;
        var newState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };
    MoliEditor.prototype._onTab = function (e) {
        var maxDepth = 4;
        this.onChange(draft_js_1.RichUtils.onTab(e, this.state.editorState, maxDepth));
    };
    MoliEditor.prototype._toggleBlockType = function (blockType) {
        this.onChange(draft_js_1.RichUtils.toggleBlockType(this.state.editorState, blockType));
    };
    MoliEditor.prototype._toggleInlineStyle = function (inlineStyle) {
        this.onChange(draft_js_1.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    };
    MoliEditor.prototype.render = function () {
        var editorState = this.state.editorState;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        var className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }
        //
        return (<div className="RichEditor-root">
                <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType}/>
                <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle}/>
                <div className={className} onClick={this.focus}>
                    <draft_js_1.Editor blockStyleFn={getBlockStyle} customStyleMap={styleMap} editorState={editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} onTab={this.onTab} placeholder="Tell a story..." ref="editor" spellCheck={true}/>
                </div>
                
                    

            </div>);
        // return (
        //     <div className="App">
        //
        //
        //
        //
        //         <div className="App-header">
        //
        //
        //             <div dangerouslySetInnerHTML={{__html: testHtml}}></div>
        //             <Button type="primary">fuck</Button>
        //             <h2>Welcome to React2222</h2>
        //         </div>
        //         <div className="App-intro">
        //
        //             <Editor editorState={this.state.editorState} onChange={this.onChange}/>
        //         </div>
        //
        //     </div>
        // );
    };
    return MoliEditor;
}(React.Component));
// Custom overrides for "code" style.
var styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return '';
    }
}
// interface ReactInstance{
//     active:any;
// }
var StyleButton = /** @class */ (function (_super) {
    __extends(StyleButton, _super);
    function StyleButton(props) {
        var _this = _super.call(this, props) || this;
        _this.onToggle = function (e) {
            e.preventDefault();
            _this.props.onToggle(_this.props.style);
        };
        return _this;
    }
    StyleButton.prototype.render = function () {
        var className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (<span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>);
    };
    return StyleButton;
}(React.Component));
var BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];
var BlockStyleControls = function (props) {
    var editorState = props.editorState;
    var selection = editorState.getSelection();
    var blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (<div className="RichEditor-controls">
            {BLOCK_TYPES.map(function (type) {
        return <StyleButton key={type.label} active={type.style === blockType} label={type.label} onToggle={props.onToggle} style={type.style}/>;
    })}
        </div>);
};
var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];
var InlineStyleControls = function (props) {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (<div className="RichEditor-controls">
            {INLINE_STYLES.map(function (type) {
        return <StyleButton key={type.label} active={currentStyle.has(type.style)} label={type.label} onToggle={props.onToggle} style={type.style}/>;
    })}
        </div>);
};
exports.default = MoliEditor;
