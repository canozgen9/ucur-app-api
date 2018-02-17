import express from "express";
import jwt from "jsonwebtoken";
import {RouteConfig} from "./RouteConfig";
import UserModel from "./../models/UserModel";
import CategoryModel from "./../models/CategoryModel";
import TransportRequestModel from "./../models/TransportRequestModel";

let publicRoutes = express.Router();

publicRoutes.post('/create-user', function (req, res) {
    let user = req.body;
    UserModel.create(user, function (err) {
        if (err) {
            res.json({success: false, message: "User could not created."});
        } else {
            res.json({success: true, user: user});
        }
    });
});

//Signin Route
publicRoutes.post('/signin', function (req, res) {
    UserModel.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            res.json({success: false, message: 'Authentication failed. Something went wrong.'});
        } else if (user) {
            console.log(user);
            if (req.body.password === user.password) {
                // let token = jwt.sign(user, RouteConfig.AppSecret, {
                //     expiresIn: 86400000
                // });
                jwt.sign({user: user}, RouteConfig.AppSecret, function (err, token) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: "Authentication failed. Token could not created. Err: " + err
                        });
                    } else {
                        return res.json({success: true, user: user, token: token});
                    }
                });
            } else {
                return res.json({success: false, message: "Authentication failed. Password is not correct."});
            }
        } else {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        }
    });
});

publicRoutes.get('/public', function (req, res) {
});

publicRoutes.get('/categories', function (req, res) {
  CategoryModel.find({}, function (err, categories) {
    if (err) {
      res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({success: true, categories: categories});
    }
  });
});

publicRoutes.get('/transport/requests', function (req, res) {
  TransportRequestModel.find({}).populate('category').populate('owner').exec(function (err, transportRequestModel) {
    if (err) {
      res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({success: true, transportRequestModel: transportRequestModel});
    }
  });
});

export default publicRoutes;
