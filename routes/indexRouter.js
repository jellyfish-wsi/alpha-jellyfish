var express = require('express');
var flight = require('../lib/flight-data');
var connect = require('connect-ensure-login');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel Itinerary' });
});

router.get('/flight',
  connect.ensureLoggedIn('/auth'),
  function(req, res, next) {
    res.render('flight', {title: 'Flight Information', user: req.user});
  });

router.post('/flight',
  connect.ensureLoggedIn('/auth'),
  async function(req, res, next) {
    let flightNumber = req.body.flightNumber;
    let departureDate = req.body.depDate;

    try {
        let async_data = await flight.getFlightData(flightNumber, departureDate);
        res.render('flight', {title: 'Flight Information', user: req.user, async_data});

      } catch (err) {
        res.status(err.response.status)
        console.log("Caught error! " + err.message);
      }
  });

module.exports = router;
