var React = require('react');

var About = (props) => {
  return (
    <div>
      <h2 className="text-center"> About </h2>
      <h4> Welcome to the Modern PenPal &trade;</h4>
      <p> This is my take of the email service coding challenge.</p>
      <p>  This is built with <a href="https://facebook.github.io/react/docs/hello-world.html">ReactJS</a> on the front-end with a <a href="https://nodejs.org/en/docs/">NodeJS</a> server (<a href="http://expressjs.com/en/api.html">ExpressJS</a> framework).</p>
      <p>  The API's I chose to use were:
        <ul>
          <li><a href="https://sendgrid.com/docs/API_Reference/index.html">SendGrid</a></li>
          <li><a href="https://developers.sparkpost.com/api/">SparkPost</a></li>
        </ul>
      </p>
      
      <h4>How to use The Modern PenPal &trade;</h4>
      <p>Gone are the days of individual letters to people across the world.</p>
      <p>The internet has made it very easy to communicate with almost anyone you choose</p>
      <p>Does this mean we should loose the intimacy of a one-on-one letter?</p>
      <p>Not anymore!</p>
      <p>Use the Modern PenPal to send a message to someone you care about</p>
      
    </div>)
}
 
module.exports = About; 