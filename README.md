# Cabbage

### Requirements

- Node - This was built on v18.15
- npm - If you download Node.js, it should come with npm

### How to Run

```bash
# Clone it
git clone https://github.com/Zhusufeng/cabbage.git

# Install node packages
npm i

# Run it
npm run dev

# (Optional) Run tests
npm run test
```

You can now access it at http://localhost:8080

### APIs

#### GET /transactions

It requires the query parameter `id`, which should be a transaction id.

Request:

```bash
curl --location 'http://localhost:8080/transactions?id=abcd-efgh-ijkl-mnop'
```

Response:

```javascript
{
  "id": "abcd-efgh-ijkl-mnop",
  "budtender_id": "abcd-efgh-ijkl-mnop",
  "location_id": "abcd-efgh-ijkl-mnop",
  "basket_size": 54.99,
  "timestamp_": "2023-08-26T22:44:00.000+00:00"
}
```

#### POST /transactions

Request:

```bash
curl --location 'http://localhost:8080/transactions' \
--header 'Content-Type: application/json' \
--data '{
  "id": "abcd-efgh-ijkl-mnop",
  "basketSize": 54.99,
  "budtenderId": "abcd-efgh-ijkl-mnop",
  "locationId": "abcd-efgh-ijkl-mnop",
  "timestamp": "2023-08-26T22:44:00.000+00:00"
}'
```

Response:

```javascript
{
  "id": "abcd-efgh-ijkl-mnop",
  "budtender_id": "abcd-efgh-ijkl-mnop",
  "location_id": "abcd-efgh-ijkl-mnop",
  "basket_size": 54.99,
  "timestamp_": "2023-08-26T22:44:00.000+00:00"
}
```

Note: POST /transactions returns the body, better if it returned data inserted into the database, but I didn't dig into SQLite

#### POST /transactions/bulk

The request body takes in a `source`. The valid `source`s are:

- "good_pos"
- "ok_pos"
- "wonky_pos"

Request:

```bash
curl --location 'http://localhost:8080/transactions/bulk' \
--form 'csvFile=@"/wonky_pos.csv"' \
--form 'source="wonky_pos"'
```

It returns the ids of the items uploaded.

Response:

```javascript
[
  "c758017d-e21f-4190-a44a-85852f8817d4",
  "a2a013e6-3b84-4aa0-b8c0-9461a50de345",
  "...",
];
```

### Additional Questions & My Answers

1. Imagine one of these data sources started providing us individual transactions in JSON via a webhook. How would you refactor your code to handle this with minimal duplication?
   To consume from the webhook, I could reuse the code or the function `createTransaction` in `transaction.js`.
2. How easy would it be for us to add a fourth or fifth data source? How would you refactor your code to make it easier to handle new data sources?
   I would create another class and add the file to the `/sources` directory. Then I would add the instantiation to the `createTransaction` function in `helpers.js`.

### Improvements

- For ingesting wonky_pos, I am creating uuids, so it can be inserted into the database like the other data. However, this is not an optimal solution because if you re-upload the data, it will not recognize that the data already exists and you will have duplicate data.
- I did not scale the /transactions/bulk API to handle larger loads. The solution to scale this will depend on the infrastructure.
- I did not do much error handling such as if we are passed invalid input as I made this under the assumption that we will be passed valid data.
