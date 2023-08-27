# Cabbage

### Requirements

- Node v18

### How to Run

```bash
# Clone it
git clone https://github.com/Zhusufeng/cabbage.git

# Install node packages
npm i

# Run it
npm run dev
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
