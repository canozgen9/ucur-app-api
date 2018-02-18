import {RouteConfig} from "./RouteConfig";
import express from "express";
import jwt from "jsonwebtoken";
import TransportRequestModel from "./../models/TransportRequestModel"
import ClaimRequestModel from "./../models/ClaimRequestModel"
import TransportOfferModel from "./../models/TransportOfferModel"
import ClaimOfferModel from "./../models/ClaimOfferModel"
import UserModel from "./../models/UserModel"
import OrderModel from "./../models/OrderModel"
import ProgressModel from "./../models/ProgressModel"
import NotificationModel from "./../models/NotificationModel"


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
  let profileInformation = {};
  let userInformation;

    UserModel.findOne({"_id": userID,}).exec()
      .then(function (data) {
        userInformation = data;
        return TransportRequestModel.find({'owner': userID }).populate('category').populate('owner').exec()
    })
      .then(function (data) {
        profileInformation.transportRequest = data;
        return TransportOfferModel.find({'owner': userID }).populate('claimRequest').populate('owner').exec()
      })
      .then(function (data) {
        profileInformation.transportOffer = data;
        return ClaimRequestModel.find({'owner': userID }).populate('category').populate('owner').exec()
      })
      .then(function (data) {
        profileInformation.claimRequest = data;
        return ClaimOfferModel.find({'owner': userID }).populate('transportRequest').populate('owner').exec()
      })
      .then(function (data) {
        profileInformation.claimOffer = data;
        return res.json({success: true, userInformation, "userProfile": profileInformation});
      })

});

protectedRoutes.post('/transport/offers', function (req, res) {

  let claimRequestID = req.body ._id;
  let claimRequest;

  ClaimRequestModel.findOne({'_id': claimRequestID}).populate('category').populate('owner').exec()
  .then(function(data){
    claimRequest = data;
    return TransportOfferModel.find({"claimRequest": claimRequestID}).populate('claimRequest').populate('owner').exec()
  })
  .then(function (data) {
    return res.json({success: true, claimRequest, transportOfferModels: data});
  })
});

protectedRoutes.post('/claim/offers', function (req, res) {

  let transportRequestID = req.body ._id;
  let transportRequest;

  TransportRequestModel.findOne({'_id': transportRequestID}).populate('category').populate('owner').exec()
  .then(function(data){
    transportRequest = data;
    return ClaimOfferModel.find({"transportRequest": transportRequestID}).populate('claimRequest').populate('owner').exec()
  })
  .then(function (data) {
    return res.json({success: true, transportRequest, claimOfferModels: data});
  })
});

protectedRoutes.post('/update', function (req, res) {
    let type = req.body.type;
    let _id = req.body._id;
    let status = req.body.status;  //0 for default, 1 for accepted, 2 for negative

    switch(type) {
          //Transpor Request
          case 0:

            TransportRequestModel.update({"_id": _id}, { $set: { status: status }}, function (err, info) {
                if (err) {
                  return res.json({success: false, message: 'Something went wrong: ' + err});
                }
                else {
                  return res.json({success: true,info: info});
                }
              });

              break;

          //Transport Offer
          case 1:

            TransportOfferModel.update({"_id": _id}, { $set: { status: status }}, function (err, info) {
              if (err) {
                return res.json({success: false, message: 'Something went wrong: ' + err});
              }
              else {
                return res.json({success: true, info: info});
              }
            });

              break;

          //Claim Request
          case 2:

            ClaimRequestModel.update({"_id": _id}, { $set: { status: status }}, function (err, info) {
              if (err) {
                return res.json({success: false, message: 'Something went wrong: ' + err});
              }
              else {
                return res.json({success: true, info: info});
              }
            });


              break;

          //Claim Offer
          case 3:

          ClaimOfferModel.update({"_id": _id}, { $set: { status: status }}, function (err, info) {
            if (err) {
              return res.json({success: false, message: 'Something went wrong: ' + err});
            }
            else {
              return res.json({success: true, info: info});
            }
          });

            break;
          default:
            res.json({success: false, "Error" : "Not a valid request!" });
      }
});

protectedRoutes.post('/order/create', function (req, res) {

  let orderModel = req.body;
  OrderModel.create(orderModel, function(err, orderModel) {
          if (err){
             return res.json({success: false, message: 'Something went wrong: ' + err});
          } else {
            TransportRequestModel.update({"_id": orderModel.transportRequest}, { $set: { status: 1 }}, function (err, info) {
                if (err) {
                  return res.json({success: false, message: 'Something went wrong: ' + err});
                }
                else {
                  ClaimOfferModel.update({"_id": orderModel.claimOffer}, { $set: { status: 1 }}, function (err, info) {
                    if (err) {
                      return res.json({success: false, message: 'Something went wrong: ' + err});
                    }
                    else {
                      return res.json({ success: true, orderModel: orderModel, info: "Status updated."});
                    }
                  });
                }
              });
          }
      });
});

protectedRoutes.post('/order/progress/create', function (req, res) {

  let orderID = req.body._id;
  let plat = req.body.plat;
  let plong = req.body.plong;
  let pmessage = req.body.pmessage;

  let progressModel = {
    message: pmessage,
    lat: plat,
    lang: plong
  }

  ProgressModel.create(progressModel, function (err, progressModel) {
    if (err){
       return res.json({success: false, message: 'Something went wrong: ' + err});
    } else {
      OrderModel.findOneAndUpdate({ _id: orderID }, {$push: { progress : progressModel._id }}, function (err, orderModel) {
        return res.json({ success: true, orderModel: orderModel });
      });
    }
  });
});

protectedRoutes.post('/order', function (req, res) {

  let userID = req.body._id;
  OrderModel.find({ $or:[ {'buyer':userID}, {'requester':userID}]}).populate('orderModel').populate('buyer').populate('requester').populate('progress').exec( function (err, orderModel) {
    if (err){
       return res.json({success: false, message: 'Something went wrong: ' + err});
    } else {
        return res.json({ success: true, orderModel: orderModel });
    }
  })
});



protectedRoutes.post('/notification', function (req, res) {
  let userID = req.decoded.user._id;
  NotificationModel.find({'user': userID }).populate('user').exec(function (err, notificationModel) {
    if (err) {
      return res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({ success: true, notificationModel: notificationModel });
    }
  });
});

protectedRoutes.post('/notification/seen', function (req, res) {
  let userID = req.decoded.user._id;
  NotificationModel.update({"user": userID}, { $set: { seen: 1 }}, function (err, info) {
      if (err) {
        return res.json({success: false, message: 'Something went wrong: ' + err});
      }
      else {
        return res.json({success: true,info: info});
      }
    });


});

protectedRoutes.get('/protected', function (req, res) {
    res.json({success: true, "user": req.decoded.user});
});

let notify = function(userID, msg, type){
  let notificationModel = {
    "user": userID,
    "type": type,
    "message": msg
  }
  NotificationModel.create(notificationModel, function (err, notificationModel) {
    if (err) {
      return res.json({success: false, message: 'Something went wrong: ' + err});
    }
    else {
      return res.json({ success: true, notificationModel: notificationModel });
    }
  })
}

export default protectedRoutes;
