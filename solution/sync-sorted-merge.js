"use strict";
const date = require("Faker/lib/date");
const { orderHelperFunc, orderLogsHelperFunc } = require("./util");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const orderedCalenderLogs = new Map(); // chose Map based on insertion order
  const unOrderedDays = {};
  const listOfDates = [];

  for (let i = 0; i < logSources.length; i++) {
    let currentLog = logSources[i];

    while (currentLog.drained == false) {
      const poppedItem = currentLog.pop();
      if (poppedItem) {
        const yearItem = poppedItem.date.getFullYear();
        const monthItem = poppedItem.date.getMonth();
        const dayItem = poppedItem.date.getDate();

        const dateFormat = new Date(yearItem, monthItem, dayItem, 0, 0, 0, 0);

        if (!unOrderedDays[dateFormat]) {
          unOrderedDays[dateFormat] = [];
          unOrderedDays[dateFormat].push(poppedItem);
          listOfDates.push(dateFormat);
        } else {
          unOrderedDays[dateFormat].push(poppedItem);
        }
        logSources[i] = poppedItem;
      }
    }
  }

  // console.log(JSON.stringify(unOrderedDays, null, 2));

  // Sorting by older to newest date
  listOfDates.sort(orderHelperFunc);

  for (let i = 0; i < listOfDates.length; i++) {
    const dateKey = listOfDates[i];

    unOrderedDays[dateKey].sort(orderLogsHelperFunc).forEach((orderedLog) => {
      orderedCalenderLogs.set(orderedLog.date, orderedLog);
    });
  }

  for (const [key, value] of orderedCalenderLogs.entries()) {
    printer.print(value);
  }
  return console.log("Sync sort complete.");
};
