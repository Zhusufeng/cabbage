class GoodPOSTransaction {
  constructor() {
    this._transaction = {};
  }

  set(data) {
    const dataArray = data.split(",");
    const [id, basketSize, budtenderId, locationId, timestamp, budtenderName] =
      dataArray;
    this._transaction = {
      id,
      basketSize,
      budtenderId,
      locationId,
      timestamp: new Date(timestamp * 1000).toISOString(),
      budtenderName,
    };
  }

  get() {
    return this._transaction;
  }
}

module.exports = GoodPOSTransaction;
