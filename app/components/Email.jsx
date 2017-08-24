var React = require('react');
var EmailForm = require('EmailForm');
var emailService = require('emailService');

var Email = React.createClass({
  getInitialState: function() {
    return{
      sender: 'agirma08@gmail.com',
      to: 'agirma08@gmail.com',
      subject: 'This is a test',
      message: 'tset a si sihT'
    }
  },
  
  handleSend: function(emailObj) {
    var that = this;
    
    this.setState({
      sender: emailObj.sender,
      to: emailObj.to,
      subject: emailObj.subject,
      message: emailObj.message ,
      loading: true
    }),
    
    emailService.sendEmail(emailObj).then(function(response){
      console.log(response);
      that.setState({
        loading: false
      })
    }, function(errorMessage){
      console.log(errorMessage);
    })
  },
  
  render: function(){
    //console.log('State in Email render', this.state)
    var {loading} = this.state;
    function loadingMessage(){
      if( loading ){
        return <h3> Sending Email... </h3>
      }
    }
    
    return (
      <div>
        <h3> Welcome to the Modern PenPal &trade;</h3>
        <EmailForm onSend={this.handleSend}/>
        {loadingMessage()}
      </div>
    )
  }
  
  
  
  
  
})
  


module.exports = Email;