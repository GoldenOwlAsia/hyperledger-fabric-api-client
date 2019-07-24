# Hyperledger fabric API client

This is a starter template that interacts between Hyperledger Fabric Peers and a front end. Currently, this boilerplate provides the following features:

- Connects out of the box with the [fabcar sample network](https://github.com/hyperledger/fabric-samples/tree/release/fabcar)
- Express backend built with typescript using [Nest](https://github.com/nestjs/nest)
- Restful routing to connect a custom frontend
- Automatic OpenAPI (Swagger) generation
- Fabric Client and Fabric Ca CLient abstraction

## Installation

Make sure you have loaded `FabCar` hyperledger fabric network [Read this guide](https://hyperledger-fabric.readthedocs.io/en/release-1.4/write_first_app.html)

Install packages: `npm install`

Add environment variables in `.env` file and start server: `npm start`

## Testing

Running test by: `npm test`
