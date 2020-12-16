// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port=7070;
// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server=app.listen(port,listening);
function listening(){
    console.log(`server running, port ${port}`);
}

app.get('/get_data',function(req,res){
  res.send(JSON.stringify(projectData));
})

app.post('/add_data',function(req,res){
    console.log(req.body)
    projectData.temperature = req.body.temperature
  projectData.date = req.body.date
  projectData.userResponse = req.body.userResponse
  res.end()
})