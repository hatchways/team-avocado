const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "chefs-menu",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "image" }); 
    },
    key: function(req, file, cb) {
      console.log("Come ot Here -----------",file);
      cb(null, Date.now().toString());
    }
  })
});


module.exports = upload.single("image");