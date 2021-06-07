playAlert = require('alert-sound-notify')

var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
    'method': 'GET',
    'hostname': 'cowin.gov.in',
    'path': '/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date=07-06-2021',
    'headers': {
        'Accept-Language': 'hi_IN'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);

        var sessions = JSON.parse(body)

        sessions['sessions'].forEach(element => {
            if (element.min_age_limit === 18 && element.available_capacity_dose1 != 0) {
                console.log(element.block_name)
                playAlert()
            }
        });

    });

    res.on("error", function (error) {
        console.error(error);
    });
});

req.end();