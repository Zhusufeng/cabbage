class OkPOSTransaction {
  constructor() {
    this._transaction = {};
  }

  set(data) {
    const dataArray = data.split(",");
    const [basketSize, budtenderId, id, storeId, timestamp, budtenderName] =
      dataArray;
    this._transaction = {
      id,
      basketSize,
      budtenderId,
      locationId: storeId,
      timestamp,
      budtenderName,
    };
  }

  get() {
    return this._transaction;
  }
}

module.exports = OkPOSTransaction;
