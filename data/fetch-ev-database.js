const fetch = require("node-fetch");
const fs = require("fs");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const ev_database_url =
  "https://ev-database.org/#sort:path~type~order=.rank~number~desc|range-slider-range:prev~next=0~1200|range-slider-acceleration:prev~next=2~23|range-slider-topspeed:prev~next=110~450|range-slider-battery:prev~next=10~200|range-slider-fastcharge:prev~next=0~1500|paging:currentPage=0|paging:number=all";
const output_file_name = "output.csv";

const fetchAndWrite = async () => {
  try {
    //const response = await fetch(ev_database_url);
    //const htmlText = await response.text();
    const htmlText = fs.readFileSync("./test.html");
    const dom = new JSDOM(htmlText);
    const elements = dom.window.document.querySelectorAll(".data-wrapper");
    console.log(`found ${elements.length} elements`);
    const carList = arrayFromNodes(elements);
    writeCSVFromArray(carList);
    //fs.writeFile("test.html", htmlText, err => console.error(err));
  } catch (error) {
    console.error(error);
  }
};

const writeCSVFromArray = array => {
  if (array.length < 0) return;
  const writeStream = fs.createWriteStream(output_file_name);
  writeStream.write(Object.keys(array[0]).join() + "\n");
  array.forEach(obj => writeStream.write(Object.values(obj).join() + "\n"));
  writeStream.end();
};

const arrayFromNodes = nodes => {
  const array = [];
  nodes.forEach(element => array.push(carObjFromElement(element)));
  return array;
};

const carObjFromElement = element => {
  const obj = {
    brand: element.querySelector(".title span:nth-child(1)").innerHTML,
    model: element.querySelector(".title span:nth-child(2)").innerHTML,
    availableNow: element.querySelector(".not-current") === null,
    range: element.querySelector(".specs p:nth-child(3) span:nth-child(2)")
    .innerHTML,
    batteryKwh: element.querySelector(".battery").innerHTML,
    seats: element.querySelector('span[title="Number of seats"]').innerHTML,
    awd: element.querySelector('span[title="All Wheel Drive"]') !== null,
    rapidCharge:
      element.querySelector('span[title="Rapid charging possible"]') !== null,
    segment: element.querySelector('span[title="Market Segment"]').innerHTML,
    zeroTo100: element.querySelector(".specs p:nth-child(1) span:nth-child(2)")
      .innerHTML,
    topSpeed: element.querySelector(".specs p:nth-child(2) span:nth-child(2)")
      .innerHTML,
    efficiency: element.querySelector(".specs p:nth-child(4) span:nth-child(2)")
      .innerHTML,
    fastchargeSpeed: element.querySelector(
      ".specs p:nth-child(5) span:nth-child(2)"
    ).innerHTML,
    priceGbp: element
      .querySelector(".country_uk")
      .innerHTML.replace(/^\D+/g, "")
      .replace(/,/, "")
  };
  return obj;
};

fetchAndWrite();
