var keys = require('./keys.js');
var sendGridAPI = keys.sendGridKeys.API;
var sparkPostAPI = keys.sparkPostKeys.API
var express = require('express');


//create the app
var app = express();
const PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser')

//===============SEnDGRID ===================
//sendgrid api
const SENDGRID_API = process.env.SENDGRID_API_KEY || sendGridAPI
var helper = require('sendgrid').mail;

var sg = require('sendgrid')(SENDGRID_API);

//========================================================== 
/*==========================Spark Post=================================*/

const SPARKPOST_API_KEY = sparkPostAPI;

var SparkPost = require('sparkpost');
var client = new SparkPost(SPARKPOST_API_KEY);
/*==================================================================*/


//========================= body Parser ==========================
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//middleware
app.use(function(req, res, next){
  if( req.headers['x-forwarded-proto'] === 'https' ){
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});


app.use(express.static('public'))


app.post('/sendEmail', function(req, res) {
  var emailObj = req.body;
  var fromEmail = new helper.Email(emailObj.sender);
  var toEmail = new helper.Email(emailObj.to);
  var subject = emailObj.subject;
  var content = new helper.Content('text/plain', emailObj.message);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  sg.API(request, function (error, response) {
    if (error) {
      //if error let sparkpost take over
      console.log('Error response received');
      client.transmissions.send({
        options: {
          sandbox: true
        },
        content: {
          from: 'testing@sparkpostbox.com',
          subject: emailObj.subject,
          text: emailObj.text
        },
        recipients: [
          {address: emailObj.to}
        ]
      })
      .then(data => {
        console.log('Woohoo! You just sent your first mailing!');
        console.log(data);
      })
      .catch(err => {
        console.log('Whoops! Something went wrong');
        console.log(err);
      });
      
    }
    console.log(response.statusCode)
    console.log(response.body);
    console.log(response.headers);
  })
});


app.listen(PORT, function(){
  console.log('Server is up and listening at port ' + PORT);
})