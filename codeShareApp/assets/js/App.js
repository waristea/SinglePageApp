import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

var url = 'http://127.0.0.1:8000/snippet/2';

export default class App extends React.Component {
    constructor(props){
        super(props);
        var jsonObject = JSON.parse(props.jsonstring);
        this.state = {
            code: jsonObject.code,
        };
    }

    componentDidMount(){
        fetch(url)
            .then(response => response.json())
            .then(parsedData => {
	            this.setState({
                    code: parsedData.code
                });
	        });
    }

    onChange(newValue) {
      console.log('change',newValue);
    }

    // Render editor
    render(){
        return(
          <AceEditor
            value={this.state.code}
            mode="java"
            theme="github"
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
          />
        );
    }
}