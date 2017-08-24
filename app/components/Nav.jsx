var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function() {
    return (
      <div className = "top-bar">
        <div className ="top-bar-left">
          <ul className = "menu"> 
            <li>
              <Link to = '/about' activeClassName="active" activeStyle = {{fontWeight: 'bold'}}>About</Link>
            </li>
            <li>
              <IndexLink to = '/' activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Write Email</IndexLink>
            </li>
          </ul>
        </div>
      </div>  
    )
  }
})

module.exports = Nav; 
 
 