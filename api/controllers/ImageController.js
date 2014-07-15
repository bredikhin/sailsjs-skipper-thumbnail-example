/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/**
 * Dependencies
 *
 */
var blobAdapter = require('skipper-disk')();
var diskReceiver = blobAdapter.receive();
var Thumbnail = require('skipper-thumbnail');
var thumbnailReceiver = new Thumbnail(null, 256);
thumbnailReceiver.pipe(diskReceiver);

module.exports = {
  upload: function(req, res) {
    req.file('image')
      .on('error', function(err) {
        res.serverError(err);
      })
      .on('finish', function() {
        res.json({
          message: 'File(s) uploaded successfully!'
        });
      })
      .pipe(thumbnailReceiver).pipe(diskReceiver);
  }
};
