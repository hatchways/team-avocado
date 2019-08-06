const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

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
      cb(null, Date.now().toString());
    }
  })
});


module.exports = upload.single("image");