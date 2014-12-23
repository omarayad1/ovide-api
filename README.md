# ovide-api

API Server for Ovide, written in Sails.js

- Integrates with ovide-core for Verilog processing and ovide-web as its web interface

#Building and Running

## Dependencies
```
npm install
```

## Deploying Server
```
sails lift
```

##Environment Variables
Make sure before deploying that the following environment variables have been set:

- FTP_HOST
- FTP_USERNAME
- FTP_PASSWORD
- RABBIT_URL (retrieved from AMQP provider)


