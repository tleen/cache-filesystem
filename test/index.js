'use strict';

var cache = require('..')(),
pkg = require('../package.json'),
should = require('should');

// sort of stupid tests, but they are my most basic and initial tests to get testing up and going
describe('versioning', function(){
  it('should have a version', function(){
    cache.should.have.property('version');
  });

  it('should equal package version', function(){
    cache.version.should.be.exactly(pkg.version);
  });
});
