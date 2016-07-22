/**
 * Created by Macbook on 7/21/16.
 */
var express = require("express");
var bodyParser = require("body-parser");
var busboyBodyParser = require("busboy-body-parser");
var cors = require("cors");
var AWS = require("aws-sdk");
var fs = require("fs");
var mongodb = require("mongodb");
var app = express();
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
PORT = process.env.PORT || 80;


// middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(busboyBodyParser("5mb"));

// AWS configuration
// AWS.config.loadFromPath('./config/config.json');
AWS.config.region = "ap-northeast-1";

var mongoClient = mongodb.MongoClient;
var mongoUrl = "mongodb://localhost:27017/face";




// POST upload
app.post("/upload", function (req, res) {

    var s3 = new AWS.S3({params: {Bucket: "sungju1203", Key: AWS_ACCESS_KEY_ID}});
    s3.createBucket(function (err) {
        if (err) {
            console.log("Error: ", err);
        } else {
            s3.upload({Body: "hello!"}, function () {
                console.log("Successfully uploaded data to bucket");
            });
        }
    });

    // var body = fs.createReadStream("")
    // console.log("incoming POST request");
    // console.log(req.files);
    // console.log("filename: ", req.files.file.name);
    // console.log("filepath: ", req.files.file.path);
    //
    // fs.writeFile("./data/" + req.files.file.name, "file written!", function (err) {
    //     if (err) {
    //         console.log("error: ", err);
    //     } else {
    //         console.log("the file was saved");
    //     };
    // });
});


app.get("/image", function (req, res) {

});

app.listen(PORT, function(){
    console.log('listening to events on a "port".')
});