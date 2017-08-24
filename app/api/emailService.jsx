var axios = require('axios');

module.exports = {
  
  sendEmail : function(emailObj){
    console.log('axios sendEmail emailObj', emailObj);
    return axios.post('/sendEmail', emailObj)
      .then(function (response){
        console.log('RESPONSE FROM AXIOS, ', response)
      })
      .catch(function(error){
        console.log('ERR from axios, ', error)
      });
  }
}
