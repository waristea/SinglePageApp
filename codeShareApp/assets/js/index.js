import React from 'react';
import ReactDOM from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';
import App from './App.js';

var root = document.getElementById('container');

ReactDOM.render(<App jsonstring ={root.getAttribute('data-json-string')}/>, root);