import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

var url = 'http://127.0.0.1:8000/snippet/1/';

export default class App extends React.Component {
    constructor(props){
        super(props);
        let jsonObject = JSON.parse(props.jsonstring);
        this.state = {
            id       : jsonObject.id,// nanti dihilangkan
            title    : jsonObject.title,
            code     : jsonObject.code,
            linenos  : jsonObject.linenos,// nanti dihilangkan
            language : jsonObject.language,
            style    : jsonObject.style
        };
    }

    componentDidMount(){
        /*
        fetch(url)
            .then(response => response.json())
            .then(parsedData => {
	            this.setState({
	                id       : parsedData.id,// nanti dihilangkan
	                title    : parsedData.title,
                    code     : parsedData.code,
                    linenos  : parsedData.linenos,// nanti dihilangkan
                    language : parsedData.language,
                    style    : parsedData.style
                });
	        });
	        */
    }

    onChange(newValue) {
        this.setState({
            code : newValue
        });
        console.log('change',newValue);
    }

    save(){
        console.log('Saving..');
        var jsonPut = JSON.stringify({
            id       : this.state.id,
            title    : this.state.title,
            code     : this.state.code,
            linenos  : this.state.linenos,
            language : this.state.language,
            style    : this.state.style,
        });


        fetch(url, {
            method: 'PUT',
            body: jsonPut
        }).then(response => response.json().then(json => console.log(json)))
    }

    // Render editor
    render(){
        return(
            <div>
                <button onClick={this.save.bind(this)}> Save </button>
                <AceEditor
                    value={this.state.code}
                    mode="java"
                    theme="github"
                    onChange={this.onChange.bind(this)}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                />
            </div>
        );
    }
}