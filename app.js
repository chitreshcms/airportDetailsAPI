var express = require("express");
db =  require("./db/db");
fs = require("fs");
bodyParser = require('body-parser');


//Setting up the express
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
// Initial route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Airport Detail API, ab Ud Chalo! ' });
})
var airportDummy = {
    "1" : {
        "airport_name":"Jaiput International Airport",
        "city_name":"Jaipur",
        "airport_code":2,
        "country_code":1      
    }
 }


// app.get('/api/airports',(req,res)=>{
//     fs.readFile( __dirname + "/db/" + "db.json", 'utf8', function (err, data) {
//     console.log( data );
//     res.end( data );
//     });
// });

// app.post('/api/airports/create', function (req, res) {
//     console.info("Request body: " + req.body);
//     let airportDetail = JSON.stringify(req.body, null,'\t');
//     fs.writeFile( __dirname + "/db/" + "db.json",',\n'+airportDetail, {flag:'a+'},(err)=>{
//         if (err) throw err;
//         console.log("Airport Added");
//     });
//     res.end("Airport Added Successfully");
//  })
 

const PORT=3000;

app.listen(PORT,()=>{
    console.log('Server running on port :'+ PORT);
});