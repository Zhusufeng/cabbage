# Happy Cabbage

### Requirements

- Node v18

### How to Run

```bash
# Clone it
git clone <ADDRESS>

# Install node packages
npm i

# Run it
npm run dev
```

You can now access it at http://localhost:8080

### APIs

#### GET /transactions

Request URL: http://localhost:8080/transactions?id=<TRANSACTION_ID>
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

Request URL: http://localhost:8080/transactions
Request Body:

```javascript
{
  "id": "abcd-efgh-ijkl-mnop",
  "budtender_id": "abcd-efgh-ijkl-mnop",
  "location_id": "abcd-efgh-ijkl-mnop",
  "basket_size": 54.99,
  "timestamp_": "2023-08-26T22:44:00.000+00:00"
}
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

Request URL: http://localhost:8080/transactions
Request Body:

```javascript
{
  "source": "good_pos", // or "ok_pos" or "wonky_pos"
}
```

Response:

```javascript
[
  "c758017d-e21f-4190-a44a-85852f8817d4",
  "a2a013e6-3b84-4aa0-b8c0-9461a50de345",
  "...",
];
```

Improvements

- creating uuids
- worker thread
