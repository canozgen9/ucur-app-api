import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import publicRoutes from "./api/PublicRoutes"
import protectedRoutes from "./api/ProtectedRoutes"

let app = express();
let app_url = 'localhost';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vertex-ucur:1230123@ds237748.mlab.com:37748/vertex-ucur').then(
    () => {
        //Todo: handle error
    },
    err => {
        //Todo: handle error
    }
);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/u', protectedRoutes);
app.use('/api', publicRoutes);

app.listen(3000).on('error', (err) => {
    if (err) {
        console.log("Something went wrong. Err: " + err);
    }
});

console.log('----------------------------------');
console.log('App is running on 3000...');
console.log('----------------------------------');
