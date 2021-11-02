// run this script to convert a raw JS array to a JSON file for mongodb storage
/* 
output data format:
[
  {
    solution: []
  }
] */

const rawDataSet = require("./raw_10000solutions_1D.js");
const fs = require("fs");

const len = rawDataSet.length;

const transformedDataSet = rawDataSet.map((solution) => ({ solution }));

fs.writeFile(
  "./10000solutions_1D.json",
  JSON.stringify(transformedDataSet),
  (err) => {
    if (err) console.log("❌", err);
    console.log("🎉🥳🎊 generation complete");
  },
);
