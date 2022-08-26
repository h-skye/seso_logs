"use strict";
const {
  orderHelperFunc,
  orderLogsHelperFunc,
  whyAreLogsSoPainfulAsyncHelper,
  orderTheLogsAsyncHelper,
} = require("./util");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    try {
      const unresolvedPromises = [];

      for (let i = 0; i < logSources.length; i++) {
        const currentLogSrc = logSources[i];

        const drainedLogs = whyAreLogsSoPainfulAsyncHelper(currentLogSrc);
        unresolvedPromises.push(drainedLogs);
      }

      orderTheLogsAsyncHelper(unresolvedPromises, printer);

      resolve(console.log("Async sort complete."));
    } catch (e) {
      console.error("Error in async logging");
      console.error(e);
    }
  });
};
