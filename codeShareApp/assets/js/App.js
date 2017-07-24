import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import { Button } from 'react-bootstrap';

let url = 'http://127.0.0.1:8000/snippet/api/';

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

    /*
    componentDidMount(){
        // For load() NOT ADJUSTED TO VAR CHANGE
        fetch(apiUrl)
            .then(response => response.json())
            .then(parsedData => {
                this.setState({
                    id : parsedData.id,
                    dateCreated : parsedData.date_created,
                    title : parsedData.title,
                    value : parsedData.code,
                    mode : parsedData.language,
                    theme : parsedData.theme,
                    highlightActiveLine : parsedData.highlight_active_line,
                    showPrintMargin : parsedData.show_print_margin,
                    showGutter : parsedData.show_gutter,
                    tabSize : parsedData.tab_size,
                    showLineNumbers : parsedData.show_line_numbers,
                    enableBasicAutocomplete : parsedData.enable_basic_autocomplete,
                    enableLiveAutocomplete : parsedData.enable_live_autocomplete,
                });
	        });

    }
    */

    codeOnChange(newValue) {
        this.setState({
            value : newValue
        });
        //console.log('change',newValue);
    }

    setTheme(e) {
        this.setState({
            theme: e.target.value
        })
    }

    setTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    setMode(e) {
        this.setState({
            mode: e.target.value
        })
    }

    setBoolean(name, value) {
        this.setState({
          [name]: value
        })
    }
    setFontSize(e) {
        this.setState({
          fontSize: parseInt(e.target.value,10)
        })
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

        console.log(jsonPut);
        var apiUrl = url.concat(this.state.id,'/');

        console.log(apiUrl);
        fetch(apiUrl, {
            method: 'PUT',
            body: jsonPut
        }).then(response => console.log(response))
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
        };
        this.save = this.save.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.codeOnChange = this.codeOnChange.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.setBoolean = this.setBoolean.bind(this);
    }

    // Render editor
    render(){
        return(
            <div>
                {/* Title */}
                <div className="titleContainer">
                    <div className="titleText">
                        {this.state.title}
                        <Button onClick={this.setTitle}>
                            Edit
                        </Button>
                    </div>
                </div>

                {/* Mode */}
                <div className="field">
                    <label>
                        Mode:
                    </label>
                    <p className="control">
                        <span  className="select">
                            <select name="Mode" onChange={this.setMode} value={this.state.mode}>
                            {modes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                            </select>
                        </span>
                    </p>
                </div>

                {/* Theme */}
                <div className="field">
                    <label>
                       Theme:
                    </label>
                    <p className="control">
                        <span  className="select">
                            <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                            {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                        </span>
                    </p>
                </div>

                {/* Font Size*/}
                <div className="field">
                    <label>
                       Font Size:
                    </label>
                    <p className="control">
                        <span  className="select">
                        <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
                            {[14,16,18,20,24,28,32,40].map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                        </select>
                        </span>
                    </p>
                </div>

                {/* Checkboxes */}
                {/* Enable Basic Auto Complete */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.enableBasicAutocomplete} onChange={(e) => this.setBoolean('enableBasicAutocomplete', e.target.checked)} />
                            Enable Basic Autocomplete
                        </label>
                    </p>
                </div>
                {/* Enable Live Auto Complete */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.enableLiveAutocomplete} onChange={(e) => this.setBoolean('enableLiveAutocomplete', e.target.checked)} />
                            Enable Live Autocomplete
                        </label>
                    </p>
                </div>
                {/* Show Gutter */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.showGutter} onChange={(e) => this.setBoolean('showGutter', e.target.checked)} />
                            Show Gutter
                        </label>
                    </p>
                </div>
                {/* Show Print Margin */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.showPrintMargin} onChange={(e) => this.setBoolean('showPrintMargin', e.target.checked)} />
                             Show Print Margin
                        </label>
                    </p>
                </div>
                {/* Highligh Active Line */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.highlightActiveLine} onChange={(e) => this.setBoolean('highlightActiveLine', e.target.checked)} />
                            Highlight Active Line
                        </label>
                    </p>
                </div>
                {/* Show Line Numbers */}
                <div className="field">
                    <p className="control">
                        <label className="checkbox">
                            <input type="checkbox" checked={this.state.showLineNumbers} onChange={(e) => this.setBoolean('showLineNumbers', e.target.checked)} />
                            Show Line Numbers
                        </label>
                    </p>
                </div>


                <Button onClick={this.save}> Save </Button>
                <AceEditor
                    value={this.state.value}
                    mode={this.state.mode}
                    theme={this.state.theme}
                    fontSize={this.state.fontSize}
                    showPrintMargin={this.state.showPrintMargin}
                    showGutter={this.state.show_gutter}
                    highlightActiveLine={this.state.highlightActiveLine}

                    onChange={this.codeOnChange.bind(this)}
                    name={this.state.title}

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