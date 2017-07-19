var React = require('react');
var ReactDOM = require('react-dom');
var root = document.getElementById('container');

var Codemirror = require('react-codemirror');
const createReactClass = require('create-react-class');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

var defaults = {
	markdown: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
	javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

var App = createReactClass({
	getInitialState () {
		var json = JSON.parse(this.props.jsonstring);;
		return {
			code: json.code,
			readOnly: false,
			mode: 'markdown',
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode,
		});
	},
	changeMode (e) {
		var mode = e.target.value;
		this.setState({
			mode: mode,
			code: defaults[mode],
		});
	},
	toggleReadOnly () {
		this.setState({
			readOnly: !this.state.readOnly
		}, () => this.refs.editor.focus());
	},
	render () {
		var options = {
			lineNumbers: true,
			readOnly: this.state.readOnly,
			mode: this.state.mode,
		};
		return(
            <div>
                <Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
				<div style={{ marginTop: 10 }}>
					<select onChange={this.changeMode} value={this.state.mode}>
						<option value="markdown">Markdown</option>
						<option value="javascript">JavaScript</option>
					</select>
					<button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
				</div>
			</div>
		);

	}

});

ReactDOM.render(<App jsonstring ={root.getAttribute('data-json-string')}/>, root);
