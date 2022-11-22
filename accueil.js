function unicorn() {
    return React.createElement(
        'div',
        null,
        'plop'
    );
}

var unicornContainer = document.getElementById('unicorn');
var unicornDOM = ReactDOM.createRoot(unicornContainer);
unicornDOM.render(unicorn());