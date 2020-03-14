const assert = require('assert');
const jellyfish = require('../lib/flight-data');

describe('getFlightData', function(){
  it('should return flight information', function(){
    assert.equal(getFlightData(), rawdata);
  });
});
