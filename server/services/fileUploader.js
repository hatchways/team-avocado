const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const router = express.Router();
const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: "kF+5qB3iA9qPqGWwy75jSfZwCG2kBxBvw7MVcbrS",
  accessKeyId: "AKIAJBZTB3Y45ZKY2YYQ",
  region: "us-east-2"
});

console.dir(aws.config);
process.exit(1);

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "chefsmenu",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "image" });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

router.post("/", upload.single("image"), function(req, res, next) {
  console.log(req.file.location);

  res.send("Successfully uploaded image file!");
});

module.exports = router;
