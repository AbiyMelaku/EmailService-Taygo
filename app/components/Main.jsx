var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
  return (
    <div>
      <h2>Main Component</h2>
      <Nav/>
      <div className="row">
        <div className="columns medium-6 large-4 small-centered">
          {props.children}
        </div>
      </div>
    </div>
  )
}

module.exports = Main;