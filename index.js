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
      return fs.writeFile(filepath, JSON.stringify(data), {encoding: 'utf-8'}, callback);
    });
  };

  var read = function(key, callback){
    var filepath = keyToPath(key);
    fs.readFile(filepath, {encoding : 'utf-8'}, function(err, data){
      if(err) return callback(err);
      else return callback(null, JSON.parse(data));
    });
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
    var returner = [];
    fs.exists(configuration.directory, function(exists){
      if(!exists) return callback(null, returner);

      walker(configuration.directory).
	on('file', function(file, stat){
	  returner.push(pathToKey(file));
	}).
	on('end', function(){
	  callback(null, returner);
	});
    });
  };

  var size = function(callback){
    keys(function(err, result){ 
      return callback(result.length);
    });
  };

  return {
    write : write,
    has : has,
    read : read,
    remove : remove,
    clear : clear,
    keys : keys,
    size : size,
    version : pkg.version
  };

};
