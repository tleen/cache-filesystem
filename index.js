'use strict';

var fs = require('fs-extra'),
pkg = require('./package.json'),
_ = require('underscore');

module.exports = function(config){

  var configuration = _.defaults({}, config, {
    duration : '5 minutes'
  });

  return {
    version : pkg.version
  };

};
