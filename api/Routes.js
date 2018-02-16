import express from "express";

let apiRoutes = express.Router();

apiRoutes.get('/helloworld', function (req, res) {
    res.json({success: true});
});

export default apiRoutes;
