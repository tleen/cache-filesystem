'use strict';

var crypto = require('crypto'),
fs = require('fs-extra'),
path = require('path'),
pkg = require('./package.json'),
walker = require('walker'),
_ = require('underscore');

module.exports = function(config){

  var configuration = _.defaults({}, config, {
    directory : './.cache',
  });

  fs.mkdirsSync(configuration.directory);

  function keyToPath(key){
    return path.join(configuration.directory,key.substr(0,2),key + '.json');
  }

  function pathToKey(filename){
    return path.basename(filename,'.json');
  }

  var clear = function(callback){
    fs.remove(configuration.directory, callback);
  };

  var write = function (key, data, callback){
    var filepath = keyToPath(key);
    fs.createFile(filepath, function(err){
      if(err) return callback(err);
      return fs.writeFile(filepath, data, {encoding: 'utf-8'}, callback);
    });
  };

  var read = function(key, callback){
    var filepath = keyToPath(key);
    return fs.readFile(filepath, {encoding : 'utf-8'}, callback);
  };

  var has = function(key, callback){
    var filepath = keyToPath(key);
    fs.exists(filepath, callback);
  };

  var remove = function(key, callback){
    var filepath = keyToPath(key);
    fs.remove(filepath, callback);
  };

  var keys = function(callback){
    var keys = [];
    walker(configuration.directory).
      on('file', function(file, stat){	  
	console.log('file found',file);
	keys.push(pathToKey(file));
      }).
      on('end', function(){
	callback(null, keys);
      });
  };

  return {
    write : write,
    has : has,
    read : read,
    remove : remove,
    clear : clear,
    keys : keys,
    version : pkg.version
  };

};
