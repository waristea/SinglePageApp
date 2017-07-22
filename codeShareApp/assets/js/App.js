import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/java';
import 'brace/theme/github';

//let url = 'http://127.0.0.1:8000/snippet/api/';

const modes = [
  'java',
  'javascript',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
]

const themes = [
  'github',
  'monokai',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
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
        // For load()
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
        console.log('change',newValue);
    }

    setTheme(e) {
        this.setState({
            theme: e.target.value
        })
    }

    // Not done yet
    setTitle(e){
        this.setState({
            title: e.target.value;
        });
    }

    setMode(e) {
        this.setState({
            mode: e.target.value
        })
    }

    save(){
        console.log('Saving..');
        var jsonPut = JSON.stringify({
            id : this.state.id,
            dateCreated : this.dateCreated,
            title : this.state.title,
            value : this.state.value,
            language : this.state.mode,
            theme : this.state.theme,
            highlightActiveLine : this.state.highlightActiveLine,
            showPrintMargin : this.state.showPrintMargin,
            showGutter : this.state.showGutter,
            tabSize : this.state.tabSize,
            showLineNumbers : this.state.showLineNumbers,
            enableBasicAutocomplete : this.state.enableBasicAutocomplete,
            enableLiveAutocomplete : this.state.enableLiveAutocomplete,
        });

        let apiUrl = url.concat(this.state.id);
        fetch(apiUrl, {
            method: 'PUT',
            body: jsonPut
        }).then(response => response.json().then(json => console.log(json)))
    }

    constructor(props){
        super(props);
        let jsonObject = JSON.parse(props.jsonstring);
        this.state = {
            id : jsonObject.id,
            dateCreated : jsonObject.date_created,
            title : jsonObject.title,
            value : jsonObject.code,
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
        //this.setFontSize = this.setFontSize.bind(this);
        //this.setBoolean = this.setBoolean.bind(this);
    }

    // Render editor
    render(){
        return(
            <div>
                <div className="titleContainer">
                    <div className="titleText">
                    {this.state.title}
                    </div>
                    <button onClick={this.setTitle} className="button-edit-title">
                    Edit
                    </button>
                </div>
                <div className="field">
                 <label>
                   Theme:
                 </label>
                   <p className="control">
                     <span  className="select">
                       <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                        {themes.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
                       </select></span>
                   </p>
               </div>
               <div className="field">
                 <label>
                   Theme:
                 </label>
                   <p className="control">
                     <span  className="select">
                       <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                        {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                       </select></span>
                   </p>
               </div>


                <button onClick={this.save}> Save </button>
                <AceEditor
                    value={this.state.value}
                    mode={this.state.mode}
                    theme={this.state.theme}
                    onChange={this.codeOnChange.bind(this)}
                    name={this.state.title}
                    editorProps={{$blockScrolling: true}}
                />
            </div>
        );
    }
}