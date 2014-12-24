# Ovide Api

API Server for Ovide, written in Sails.js

- Integrates with ovide-core for Verilog processing and ovide-web as its web interface

Currently running on [A Heroku Dyno](http://ovide-api.herokuapp.com)

# Building and Running

## Dependencies
```
sudo npm install -g sails
npm install
```

## Environment Variables
Make sure before deploying that the following environment variables have been set:

- FTP_HOST
- FTP_USERNAME
- FTP_PASSWORD
- RABBIT_URL (retrieved from AMQP provider)
- DATABASE_URL (PostgreSQL Server URL)


## Deploying Server
```
sails lift
```



# Contributing & Adding Features
If you'd like to add a new feature, start by adding its module in ovide-core. Once that's done, modify the routing within the controllers as necessary to integrate the new functionality. 

For example, if the new desired feature is Verilog-specific, edit the api/controllers/VerilogController.js and add a function that works with the new module in ovide-core. If this function exposes new features to the web interface, modify in ovide-web accordingly.

# Roadmap
- Multi-user support
- Move from FTP to a more suitable storage solution
- For other suggested features see Ovide-web repo
