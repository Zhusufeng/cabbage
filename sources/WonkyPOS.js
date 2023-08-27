const { v4: uuidv4 } = require("uuid");
class WonkyPOSTransaction {
  constructor() {
    this._transaction = {};
  }

  set(data) {
    const dataArray = data.split(",");
    const [budtenderId, totalSpent, storeId, timestamp, firstName, lastName] =
      dataArray;
    this._transaction = {
      id: uuidv4(),
      basketSize: parseFloat(totalSpent.split("$")[1]),
      budtenderId,
      locationId: storeId,
      timestamp,
      budtenderName: `${firstName} ${lastName}`,
    };
  }

  get() {
    return this._transaction;
  }
}

module.exports = WonkyPOSTransaction;
