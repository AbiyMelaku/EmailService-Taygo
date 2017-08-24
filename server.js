var express = require('express');
//var router = express.Router();

//create the app
var app = express();
const PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser')

//===============SEnDGRID ===================
//sendgrid api
const SENDGRID_API = process.env.SENDGRID_API_KEY || "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"
var helper = require('sendgrid').mail;

var sg = require('sendgrid')(SENDGRID_API);

//========================================================== 
/*==========================Spark Post=================================*/

const SPARKPOST_API_KEY = '1a128e3c05a72b16e3782e2ddddd3594a41d3927'

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

// app.use('/*', function(req,res,next) { 
//   res.header("Access-Control-Allow-Origin", "*"); 
//   res.header("Access-Control-Allow-Credentials", "true"); 
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); 
//   res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
//   next(); 
// });

app.use(express.static('public'))



// /*==============================SENDGRID================================*/
// //sendgrid api
// const SENDGRID_API = process.env.SENDGRID_API_KEY || "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"
//
//var helper = require('sendgrid').mail;
// var fromEmail = new helper.Email('agirma08@gmail.com');
// var toEmail = new helper.Email(agirma08@gmail.com');
// var subject = 'Sending with SendGrid is Fun';
// var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
// var mail = new helper.Mail(fromEmail, subject, toEmail, content);

// var sg = require('sendgrid')(SENDGRID_API);
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON()
// });



// sg.API(request, function (error, response) {
//   if (error) {
//     console.log('Error response received');
//   }
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// });

// /*=====================================================================*/


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







// /*==========================Spark Post=================================*/

// const SPARKPOST_API_KEY = '1a128e3c05a72b16e3782e2ddddd3594a41d3927'

// var SparkPost = require('sparkpost');
// var client = new SparkPost(SPARKPOST_API_KEY);

// client.transmissions.send({
//     options: {
//       sandbox: true
//     },
//     content: {
//       from: 'testing@sparkpostbox.com',
//       subject: 'Hello, World!',
//       text: 'World is BiG'
//     },
//     recipients: [
//       {address: 'agirma08@gmail.com'}
//     ]
//   })
//   .then(data => {
//     console.log('Woohoo! You just sent your first mailing!');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('Whoops! Something went wrong');
//     console.log(err);
//   });
// /*=====================================================================*/




app.listen(PORT, function(){
  console.log('Server is up and listening at port ' + PORT);
})