function unicorn () {
    return <div>plop</div>
}

const unicornContainer = document.getElementById('unicorn');
const unicornDOM = ReactDOM.createRoot(unicornContainer);
unicornDOM.render(unicorn());