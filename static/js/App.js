import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { Button, ButtonToolbar, ButtonGroup, Col, Glyphicon, Grid, Navbar,
Panel, DropdownButton, MenuItem, Row, Tooltip, Overlay} from 'react-bootstrap';

let herokubase = 'https://cryptic-reaches-25567.herokuapp.com/';
let url = 'https://cryptic-reaches-25567.herokuapp.com/snippet/api/';
let urlHtml = 'https://cryptic-reaches-25567.herokuapp.com/snippet/'

const modes = [
  'java','javascript','python','xml','ruby','sass','markdown','mysql',
  'json','html','handlebars','golang','csharp','elixir','typescript','css'
]

const themes = [
  'github','monokai','tomorrow','kuroir','twilight','xcode','textmate',
  'solarized_dark','solarized_light','terminal'
]

modes.forEach((mode) => {
    require('brace/mode/'+mode);
    require('brace/snippets/'+mode);
})

themes.forEach((theme) => {
    console.log(theme);
    require('brace/theme/'+theme);
})

export default class App extends React.Component {
    codeOnChange(newValue) {
        this.setState({
            value : newValue
        });
        console.log('change',newValue);
    }

    setTheme(val) {
        this.setState({
            theme: val
        })
    }

    setEditTitle(e){
        this.setState({
            titleEdit: !this.state.titleEdit,
        });
    }

    setTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    setMode(val) {
        this.setState({
            mode: val
        })
    }

    setFontSize(val) {
        this.setState({
          fontSize: val
        })
    }

    setToggleSave(){
        this.setState({
            showToggleSave: !this.state.showToggleSave
        });
    }

    setToggleCopy(){
        this.setState({
            showToggleCopy: !this.state.showToggleCopy
        });
    }

    copyLink() {
        var Url = urlHtml.concat(this.state.id,'/');
        var textField = document.createElement('textarea');
        textField.innerText = Url;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        this.setToggleCopy();
    }

    save(){
        console.log('Saving..');
        var jsonPut = JSON.stringify({
            id : this.state.id,
            title : this.state.title,
            is_private : this.state.isPrivate,
            code : this.state.value,
            font_size : this.state.fontSize,
            language : this.state.mode,
            theme : this.state.theme,
            highlight_active_line : this.state.highlightActiveLine,
            show_print_margin : this.state.showPrintMargin,
            show_gutter : this.state.showGutter,
            tab_size : this.state.tabSize,
            show_line_numbers : this.state.showLineNumbers,
            enable_basic_autocomplete : this.state.enableBasicAutocomplete,
            enable_live_autocomplete : this.state.enableLiveAutocomplete,
        });
        var apiUrl = url.concat(this.state.id,'/');

        fetch(apiUrl, {
            method: 'PUT',
            body: jsonPut
        }).then(response => {
            this.setToggleSave();
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
        //.json().then(json => console.log(json)))
    }

    constructor(props){
        super(props);
        let jsonObject = JSON.parse(props.jsonstring);
        this.state = {
            id : jsonObject.id,
            dateCreated : jsonObject.date_created,
            title : jsonObject.title,
            isPrivate : jsonObject.is_private,
            value : jsonObject.code,
            fontSize : jsonObject.font_size,
            mode : jsonObject.language,
            theme : jsonObject.theme,
            highlightActiveLine : jsonObject.highlight_active_line,
            showPrintMargin : jsonObject.show_print_margin,
            showGutter : jsonObject.show_gutter,
            tabSize : jsonObject.tab_size,
            showLineNumbers : jsonObject.linenos,
            enableBasicAutocomplete : jsonObject.enable_basic_autocomplete,
            enableLiveAutocomplete : jsonObject.enable_live_autocomplete,
            menuOpen : false,
            showToggleSave : false,
            showToggleCopy : false,
            titleEdit : false
        };
        this.save = this.save.bind(this);
        this.setEditTitle = this.setEditTitle.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.codeOnChange = this.codeOnChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.copyLink = this.copyLink.bind(this);
        this.setToggleCopy = this.setToggleCopy.bind(this);
        this.setToggleSave = this.setToggleSave.bind(this);
    }
    // Render editor
    render(){
        // For title edit on click
        let titleSection = null;
        if(this.state.titleEdit){
            titleSection =
            <div>
                <input type="text" id="inputTitle" value={this.state.title} autoFocus onChange={this.setTitle} onBlur={(e) => this.setEditTitle(e)}></input>
                <br />
            </div>
        }
        else{
            titleSection =
            <h2>
                <div id="titleSection" onClick={(e) => this.setEditTitle(e)}>{this.state.title}</div>
            </h2>
        }

        return(
            <div>
                <Overlay show={this.state.showToggleSave} container={this} target={() => ReactDOM.findDOMNode(this.refs.target)} rootClose={true} onHide={()=>this.setToggleSave()} placement="bottom">
                  <Tooltip id="overload-bottom">Saved</Tooltip>
                </Overlay>
                <Overlay show={this.state.showToggleCopy} container={this} target={() => ReactDOM.findDOMNode(this.refs.target)} rootClose={true} onHide={()=>this.setToggleCopy()} placement="bottom">
                  <Tooltip id="overload-bottom">Link Copied</Tooltip>
                </Overlay>

                {/* Title */}
                <div className="Header">
                    {titleSection}

                    <Button onClick={this.setEditTitle}><Glyphicon glyph="pencil" /></Button>
                    <Button onClick={this.save}><Glyphicon glyph="floppy-disk" /></Button>
                    <Button onClick={this.copyLink}><Glyphicon glyph="link" /></Button>
                    <Button onClick={ ()=> this.setState({ menuOpen: !this.state.menuOpen })}>Option</Button>

                </div>
                <Panel collapsible expanded={this.state.menuOpen}>
                    <ButtonToolbar>
                        <ButtonGroup>
                            {/* Mode */}
                            <DropdownButton title={this.state.mode} id="mode-dropdown">
                                {modes.map((mode) => <MenuItem eventKey={mode} key={mode} value={mode} onSelect={() => this.setMode(mode)}>{mode}</MenuItem>)}
                            </DropdownButton>

                            {/* Theme */}
                            <DropdownButton title={this.state.theme} id="theme-dropdown" >
                                {themes.map((theme) => <MenuItem eventKey={theme} key={theme} value={theme} onSelect={() => this.setTheme(theme)}>{theme}</MenuItem>)}
                            </DropdownButton>

                            {/* Font Size*/}
                            <DropdownButton title="Font Size" id="font-size-dropdown">
                                {[14,16,18,20,24,28,32,40].map((elm) => <MenuItem eventKey={elm} key={elm} value={elm} onSelect={() => this.setFontSize(elm)}>{elm}</MenuItem>)}
                            </DropdownButton>
                        </ButtonGroup>
                        {/* Checkboxes */}
                        <ButtonGroup>
                            {/* Enable Live Auto Complete */}
                            <Button active={this.state.enableLiveAutocomplete} onClick={ ()=> this.setState({ enableLiveAutocomplete: !this.state.enableLiveAutocomplete })}>
                              Autocompletion
                            </Button>
                            {/* Show Gutter */}
                            <Button active={this.state.showGutter} onClick={ ()=> this.setState({ showGutter: !this.state.showGutter })}>
                              Show Gutter
                            </Button>
                            {/* Highlight Active Line */}
                            <Button active={this.state.highlightActiveLine} onClick={ ()=> this.setState({ highlightActiveLine: !this.state.highlightActiveLine })}>
                              Highlight Active Line
                            </Button>
                            {/* Show Line Numbers */}
                            <Button active={this.state.showLineNumbers} onClick={ ()=> this.setState({ showLineNumbers: !this.state.showLineNumbers })}>
                              Line Numbers
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Panel>
                <AceEditor
                    value={this.state.value}
                    mode={this.state.mode}
                    theme={this.state.theme}
                    fontSize={this.state.fontSize}
                    showPrintMargin={this.state.showPrintMargin}
                    showGutter={this.state.showGutter}
                    highlightActiveLine={this.state.highlightActiveLine}
                    name={this.state.title}
                    height="100%"
                    width="100%"
                    editorProps={{$blockScrolling: Infinity}}
                    onChange={this.codeOnChange}

                    setOptions={{
                        enableBasicAutocompletion: this.state.enableBasicAutocomplete,
                        enableLiveAutocompletion: this.state.enableLiveAutocomplete,
                        showLineNumbers: this.state.showLineNumbers,
                        tabSize: this.state.tabSize,
                    }}
                />
            </div>
        );
    }
}