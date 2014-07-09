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
var receiver = blobAdapter.receive();

module.exports = {
	upload: function(req, res) {
    req.file('image').upload(receiver, function (err, files) {
      if (err)
        return res.serverError(err);

      res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};
