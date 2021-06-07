
var https = require('follow-redirects').https;
var fs = require('fs');

let date_ob = new Date();
console.log(date_ob)

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

let day = date+"-"+month+"-"+year
console.log(day)
var options = {
    'method': 'GET',
    'hostname': 'cowin.gov.in',
    'path': `/api/v2/appointment/sessions/public/findByDistrict?district_id=307&date=${day}`,
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
            if (element.min_age_limit === 18 && element.available_capacity_dose1 == 0) {
                console.log(element.block_name)
            }
        });

    });

    res.on("error", function (error) {
        console.error(error);
    });
});

req.end();