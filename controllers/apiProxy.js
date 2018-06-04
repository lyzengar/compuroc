const request = require('request');
const API_BASE_URL = 'http://thrustcurve.org/servlets/search';
const xml = require('xml');

function apiProxy(req, res) {
    console.log(Object.keys(req.body))
    request.post({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
        url: API_BASE_URL, 
        form: Object.keys(req.body)[0]
    }, function(err, response, body) {
        res.set('Content-Type', 'text/xml');
        res.send(body);
    })
}

function apiProxyMotor(req, res) {
    console.log(Object.keys(req.body))
    request.post({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
        url: API_BASE_URL, 
        form: Object.keys(req.body)[0]
    }, function(err, response, body) {
        res.set('Content-Type', 'text/xml');
        res.send(body);
    })
}


module.exports = {
    apiProxy, 
    apiProxyMotor
}