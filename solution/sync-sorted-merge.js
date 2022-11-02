"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  //this is a map of timestamp and logs
  const logMap = {};
  //array to sort the logs based on date
  let dateArray = [];

  const createMap = (logSource) => {
    const timeStamp = logSource.last.date.getTime();
    logMap[timeStamp] = logSource.last;
    dateArray.push([timeStamp]);
  };

  logSources.map((logSource) => {
    let flag = true;
    //add the logs to map until there are no more
    while (flag) {
      const last = logSource.pop();
      createMap(logSource);
      if (!last) {
        flag = false;
      }
    }
  });
  dateArray.sort();
  dateArray.forEach((key) => {
    printer.print(logMap[key]);
  });
  printer.done();

  return console.log("Sync sort complete.");
};
