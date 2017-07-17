var React = require('react');
var ReactDOM = require('react-dom');
var root = document.getElementById('container');

var App = React.createClass({
    render: function(){
        return(
            <div>
                <h1>Hell2o!{this.props.name}</h1>
            </div>
		);
	}
});

ReactDOM.render(<App name ={root.getAttribute('data-name')}/>, root);
