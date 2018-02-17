import {RouteConfig} from "./RouteConfig";
import express from "express";
import jwt from "jsonwebtoken";
import TransportRequestModel from "./../models/TransportRequestModel"
import ClaimRequestModel from "./../models/ClaimRequestModel"
import TransportOfferModel from "./../models/TransportOfferModel"
import ClaimOfferModel from "./../models/ClaimOfferModel"
import UserModel from "./../models/UserModel"

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

protectedRoutes.post('/check', function (req, res) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
      jwt.verify(token, RouteConfig.AppSecret, function (err, decoded) {
          if (err) {
              return res.json({success: false, message: 'Failed to authenticate token.'});
          } else {
              return res.json({success: true, user: decoded.user });
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

protectedRoutes.post('/transport/offer/create', function (req, res) {
  let transportOfferModel = req.body;
  transportOfferModel.owner = req.decoded.user._id;
  TransportOfferModel.create(transportOfferModel, function(err, transportOfferModel) {
          if (err){
             return res.json({success: false, message: 'Something went wrong: ' + err});
          } else {
            return res.json({ success: true, transportOfferModel: transportOfferModel });
          }
      });
});

protectedRoutes.post('/claim/request/create', function (req, res) {
  let claimRequestModel = req.body;
  claimRequestModel.owner = req.decoded.user._id;
  ClaimRequestModel.create(claimRequestModel, function(err, claimRequestModel) {
          if (err){
             return res.json({success: false, message: 'Something went wrong: ' + err});
          } else {
            return res.json({ success: true, claimRequestModel: claimRequestModel });
          }
      });
});

protectedRoutes.post('/claim/offer/create', function (req, res) {
  let claimOfferModel = req.body;
  claimOfferModel.owner = req.decoded.user._id;
  ClaimOfferModel.create(claimOfferModel, function(err, claimOfferModel) {
          if (err){
             return res.json({success: false, message: 'Something went wrong: ' + err});
          } else {
            return res.json({ success: true, claimOfferModel: claimOfferModel });
          }
      });
});

protectedRoutes.post('/user/profile', function (req, res) {
  let userID = req.body._id;
  let profileInformatin = {};
  let userInformation;

    UserModel.findOne({"_id": userID,}).exec()
      .then(function (data) {
        userInformation = data;
        return TransportRequestModel.find({'owner': userID }).populate('category').exec()
    })
      .then(function (data) {
        profileInformatin.transportRequest = data;
        return TransportOfferModel.find({'owner': userID }).populate('claimRequest').exec()
      })
      .then(function (data) {
        profileInformatin.transportOffer = data;
        return ClaimRequestModel.find({'owner': userID }).populate('category').exec()
      })
      .then(function (data) {
        profileInformatin.claimRequest = data;
        return ClaimOfferModel.find({'owner': userID }).populate('transportRequest').exec()
      })
      .then(function (data) {
        profileInformatin.claimOffer = data;
        return res.json({success: true, userInformation, "userProfile": profileInformatin});
      })

});

protectedRoutes.post('/transport/offers', function (req, res) {

  let claimRequestID = req.body ._id;

  TransportOfferModel.find({"claimRequest": claimRequestID}).populate('claimRequest').populate('owner').exec(function (err, transportOfferModel) {
    if (err) {
      res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({success: true, transportOfferModels: transportOfferModel});
    }
  });
});

protectedRoutes.post('/claim/offers', function (req, res) {

  let transportRequestID = req.body ._id;

  ClaimOfferModel.find({"transportRequest": transportRequestID}).populate('transportRequest').populate('owner').exec(function (err, claimOfferModel) {
    if (err) {
      res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({success: true, claimOfferModels: claimOfferModel});
    }
  });
});

protectedRoutes.get('/protected', function (req, res) {
    res.json({success: true, "user": req.decoded.user});
});



export default protectedRoutes;
