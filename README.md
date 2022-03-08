# Secure Data Exchange Service
🏷️ Node v16.13.0<br>
🏷️ MongoDB v5.0.6<br>
🏷️ PostgreSQL v13<br>

## Routing

🟩 PORT `/api/data/push`

Push new data to service

```json
// Request >>>

{
    "data": "My very real secret data!",
    "accessTimeCount": 10,
    "expirationTime": "2022-10-10T10:10:10"
}

// <<< Response

{
    "shareCode": "NT9aGZxofU",
    "adminCode": "uj5Va05xIR"
}
```


🟩 PORT `/api/data/update`

Update data and/or params by admin code

```json
// Request >>>

{
    "adminCode": "JtmSYuE39H",
    "data": "My very real secret data! version 2!", // [opt]
    "accessTimeCount": 100, // [opt]
    "expirationTime": "2080-10-10T10:10:10" // [opt]
}

// <<< Response

true
```

🟩 GET `/api/data/:shareCode`

Get data by share code

```json
// <<< Response

{
    "data": "My very real secret data! version 2!"
}
```

🟩 POST `/api/data/delete`

Delete data by admin code

```json
// Request >>>

{
    "adminCode": "JtmSYuE39H"
}

// <<< Response

true
```

🟩 POST `/api/data/clear`

Delete all data by special clear code.<br>
If the clear code is used for the first time, then it must match the code from the environment variable. All subsequent times, the code must match what is in the storage. The Postgres database is used as a storage for the clear code

```json
// Request >>>

{
    "code": "d90b7cf2-9266-417d-b44b-c83026845ce5"
}

// <<< Response

{
    "code": "ffe078d6-7813-45e4-8a47-cd165e065b07"
}
```

🟩 POST `/api/data/cron`

Delete all expired data

```json
// Request >>>

{}

// <<< Response

true
```

## Envs

– MONGO_DB_URL="mongodb://localhost/data_exchange"<br>
– PG_HOST="localhost"<br>
– PG_USER="data_exchange"<br>
– PG_DATABASE="data_exchange"<br>
– PG_PASSWORD="data_exchange"<br>
– PG_PORT=5432<br>
– APP_PORT=8080<br>
– SHARE_CODE_SIZE=10<br>
– ADMIN_CODE_SIZE=10<br>

– CLEAR_CODE_UUID="ca97de24-e460-4c9f-a27a-7880a2bf223c"<br>
**Used to activation /api/data/clear method for the first time**<br>

– AWS_BUCKET_NAME="name"<br>
– AWS_BUCKET_REGION="eu-north-1"<br>
– AWS_ACCESS_KEY="key"<br>
– AWS_SECRET_ACCESS_KEY="key"

## How to run

1. Install dependencies `npm run install`
2. Create .env file from .env.example file and fill it with necessary data, run MongoDB and PostgreSQL
3. Run the app `npm run start`
