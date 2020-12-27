// importing express framework
const express = require("express");
const request = require('request');
const csv = require('csvtojson')

const app = express();

const CSV_HEADER = ['data', 'fundName', 'company', 'ticker', 'cusip', 'shares', 'marketValue', 'percentage'];
const feedURL = 'https://ark-funds.com/wp-content/fundsiteliterature/csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv';

const csvToJson = (csvStr) => {
  csv({
    noheader: true,
    output: "csv"
  })
  .fromString(csvStr)
  .then((csvRow)=>{
      // newArr: [ ['12/24/2020','ARKK', 'EXONE CO/THE', 'XONE', '302104104', '752144.00', '8160762.40', '0.04'], [...] ]
      const newArr = csvRow.slice(0, -3);
      console.log({newArr: newArr});
  })
};

app.get("/", function (req, res) {
  
  request.get(feedURL, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        var csv = body;
        csvToJson(csv);
    }
  });

  return res.send("Hello Heroku test");
});

// listen to port 7000 by default
app.listen(process.env.PORT || 7000, () => {
  console.log("Server is running");
});

module.exports = app;