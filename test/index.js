'use strict';

var config = {
  directory : './.cache-test'
};

var async = require('async'),
fs = require('fs-extra'),
pkg = require('../package.json'),
should = require('should'),
_ = require('underscore');


function removeCacheDir(done){
 fs.remove(config.directory, done);
}

before(removeCacheDir);


describe('versioning', function(){
  var cache = require('..')(config);

  it('should have a version', function(){
    cache.should.have.property('version');
  });

  it('should equal package version', function(){
    cache.version.should.be.exactly(pkg.version);
  });
});

describe('cachy storage interface exists', function(){
  var cache = require('..')(config);

  var fxns = ['write', 'has', 'read', 'remove', 'clear', 'keys'];
  describe('interface has', function(){
    _.each(fxns, function(fxn){
      it(fxn + '()', function(){
	cache[fxn].should.be.a.Function;
      });
    });
  });
});

describe('directory creation', function(){
  before(removeCacheDir);

  it('should not have the cache directory', function(done){
    fs.exists(config.directory, function(exists){
      exists.should.be.false;
      done();
    });
  });

  it('should create the missing cache directory on creation', function(done){
    var cache = require('..')(config);
    fs.exists(config.directory, function(exists){
      exists.should.be.true;
      done();
    });
  });

  after(removeCacheDir);
});


/* add more tests */
 
after(removeCacheDir);

