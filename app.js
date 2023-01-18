const express = require('express')
const bodyParser=require("body-parser") //for getting data in json
const request = require("request") //used to make HTTP calls.
const https=require("https") // communication bw server and browser.

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))

//by static function our server take data staticaly like css and all-public is that foldr
//in which the static required files are placed.
app.use (express.static("public"))


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html")
})


app.post("/success" , function (req,res){
  res.sendFile(__dirname+"/signup.html")
})


app.post("/", function(req,res){

  const firstname= req.body.firstName
  const lastname=req.body.lastName
  const email=req.body.email


  const data ={ // create data object according to mail chimp,want this
    members :[ // with this we can add members
      {
        email_address:email, // these are the properties of members
        status :"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

const jsonData=JSON.stringify(data) // create json of javascript(data).
const url = "https://us17.api.mailchimp.com/3.0/lists/dc5f256c16" //accoding to mail chimp

const options ={

  method : "post",
  auth: "manish:e1d0d048f7d8b82810a37497b18c717b-us17"
}

const request = https.request(url,options, function (response){ // if want to post data on server use const request

 if(response.statusCode===200){
   res.sendFile(__dirname+"/success.html")
 }
 else{
   res.sendFile(__dirname+"/failure.html")
 }
})

request.write(jsonData) //send data to the mailchimp server.


request.end()
})

app.listen(process.env.PORT || port, () => { //process... for heroku
  console.log(`Example app listening on port ${port}`)
})
