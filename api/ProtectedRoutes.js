import {RouteConfig} from "./RouteConfig";
import express from "express";
import jwt from "jsonwebtoken";
import TransportRequestModel from "./../models/TransportRequestModel"

let protectedRoutes = express.Router();

protectedRoutes.use(function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, RouteConfig.AppSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                return next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

protectedRoutes.post('/transport/request/create', function (req, res) {
  let transportRequestModel = req.body;
  transportRequestModel.owner = req.decoded.user._id;
  TransportRequestModel.create(transportRequestModel, function(err, transportRequestModel) {
          if (err){
             return res.json({success: false, message: 'Something went wrong: ' + err});
          } else {
            return res.json({ success: true, transportRequestModel: transportRequestModel });
          }
      });
});

protectedRoutes.get('/protected', function (req, res) {
    res.json({success: true, "user": req.decoded.user});
});



export default protectedRoutes;
