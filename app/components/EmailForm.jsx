var React = require('react');

var EmailForm = React.createClass({
  onFormSubmit: function(e) {
    e.preventDefault();
    
    var emailObj = {}
    
    emailObj.sender = this.refs.sender.value;
    emailObj.to = this.refs.to.value;
    emailObj.subject = this.refs.subject.value;
    emailObj.message = this.refs.message.value
    
    if( emailObj.sender.length > 0 && emailObj.to.length > 0 && emailObj.subject.length > 0 && emailObj.message.length > 0 ){
      this.refs.sender.value = '';
      this.refs.to.value = '';
      this.refs.subject.value = '';
      this.refs.message.value = '';
    
      this.props.onSend(emailObj);
  
    }
  },
  
  render: function() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="From">From<input type="text" ref="sender" placeholder='enter your email address'/></label>
          <label htmlFor="To">To<input type="text" ref="to" placeholder='enter one email'/></label>
          <label htmlFor="Subject">Subject<input type="text" ref="subject"/></label>
          <label htmlFor="Message">Message<input type="text" ref="message"/></label>
          <button className="button expanded hollow">Send</button>
        </form>
      </div>
    )
  }
})

module.exports = EmailForm;