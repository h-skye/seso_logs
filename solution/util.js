function orderHelperFunc(a, b) {
  return new Date(a) - new Date(b);
}

function orderLogsHelperFunc(a, b) {
  return new Date(a.date) - new Date(b.date);
}

async function whyAreLogsSoPainfulAsyncHelper(indvLogSource) {
  try {
    const logSourcePromises = [];

    while (indvLogSource.drained == false) {
      const poppedItem = await indvLogSource.popAsync();
      if (poppedItem) {
        logSourcePromises.push(poppedItem);
        indvLogSource = poppedItem;
      }
    }
    return logSourcePromises;
  } catch (e) {
    console.error("error in draining logs");
    console.error(e);
  }
}

async function orderTheLogsAsyncHelper(listOfLogs, printer) {
  const orderedCalenderLogs = new Map(); // chose Map based on insertion order
  const unOrderedDays = {};
  const listOfDates = [];
  let yearItem, monthItem, dayItem, dateFormat;

  try {
    for (let i = 0; i < listOfLogs.length; i++) {
      let currentLog = await listOfLogs[i];

      if (currentLog) {
        currentLog.date = new Date(currentLog.date);
        yearItem = currentLog.date.getFullYear();
        monthItem = currentLog.date.getMonth();
        dayItem = currentLog.date.getMonth();

        dateFormat = Date(yearItem, monthItem, dayItem, 0, 0, 0, 0);
      }

      if (!unOrderedDays[dateFormat]) {
        unOrderedDays[dateFormat] = [];
        unOrderedDays[dateFormat].push(currentLog);
        listOfDates.push(dateFormat);
      } else {
        unOrderedDays[dateFormat].push(currentLog);
      }
    }

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
  } catch (e) {
    console.error("Error in orderTheLogsAsyncHelper()");
    console.error(e);
  }
}

module.exports = {
  orderHelperFunc,
  orderLogsHelperFunc,
  whyAreLogsSoPainfulAsyncHelper,
  orderTheLogsAsyncHelper,
};
