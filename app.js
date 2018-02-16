import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import apiRoutes from "./api/Routes"

let app = express();
let app_url = 'localhost';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vertex-ucur:1230123@ds237748.mlab.com:37748/vertex-ucur').then(
    () => {

    },
    err => {

    }
);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://' + app_url + ':8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', apiRoutes);

app.listen(3000).on('error', (err) => {
    if (err) {
        console.log("Something went wrong. Err: " + err);
    }
});

console.log('----------------------------------');
console.log('App is running on 3000...');
console.log('----------------------------------');