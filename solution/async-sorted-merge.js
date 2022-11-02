"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const logMap = {};
  let dateArray = [];

  const createMap = (logSource) => {
    const timeStamp = logSource.last.date.getTime();
    logMap[timeStamp] = logSource.last;
    dateArray.push([timeStamp]);
  };

  await Promise.all(
    logSources.map(async (logSource) => {
      let flag = true;
      while (flag) {
        const last = await logSource.popAsync();
        createMap(logSource);
        if (!last) {
          flag = false;
        }
      }
    })
  );

  dateArray.sort();
  dateArray.forEach((key) => {
    printer.print(logMap[key]);
  });
  printer.done();
  return console.log("Async sort complete.");
};
