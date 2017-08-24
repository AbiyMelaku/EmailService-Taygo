var React = require('react');
var {Link, IndexLink} = require('react-router');

var Nav = () => {
  return (
    <div>
      <h2>Nav Component</h2>  
      <Link to = '/about' activeClassName="active" activeStyle = {{fontWeight: 'bold'}}>About</Link>
      <IndexLink to = '/' activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Write Email</IndexLink>
    </div> 
  )
}

module.exports = Nav; 
 
 