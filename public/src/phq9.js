// phq9.js ----------------------------

var ContentBox = React.createClass({
  render: function() {
    return (
      <div className="contentBox">
        Hello, World! I'm a box.
      </div> 
    );
  }
});

ReactDOM.render(
  <ContentBox />,
  document.getElementById('content')
);