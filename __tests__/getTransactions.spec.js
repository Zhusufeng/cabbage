const httpMocks = require("node-mocks-http");
const database = require("../db");
const { getTransaction } = require("../transaction");

const db = database.getDatabase();

jest.mock("../db", () => {
  const mockDb = {
    prepare: jest.fn(),
  };
  return {
    initializeDatabase: jest.fn(),
    getDatabase: () => {
      return mockDb;
    },
  };
});

describe("getTransaction", () => {
  it("should get a transaction", () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/transactions",
      params: {
        id: "abcd-efgh-ijkl-mnop",
      },
    });
    const res = httpMocks.createResponse();

    const result = {
      id: "abcd-efgh-ijkl-mnop",
      budtender_id: "abcd-efgh-ijkl-mnop",
      location_id: "abcd-efgh-ijkl-mnop",
      basket_size: 54.99,
      timestamp_: "2023-08-26T22:44:00.000+00:00",
    };

    const mockPrepareResult = {
      getAsObject: values => {
        console.log("!!!", values);
        return result;
      },
      free: jest.fn(),
    };

    db.prepare.mockImplementationOnce(query => {
      const testQuery = "SELECT * FROM transactions WHERE id=:idVal";
      expect(query).toEqual(testQuery);
      return mockPrepareResult;
    });

    getTransaction(req, res);
    // expect(mockPrepareResult.getAsObject).toHaveBeenCalledWith({
    //   ":idVal": "abcd-efgh-ijkl-mnop",
    // });
    expect(res.statusCode).toEqual(200);
    const data = res._getData();
    expect(data).toEqual(result);
  });
});
