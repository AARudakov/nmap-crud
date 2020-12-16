# nmap-crud

nmap-crud
Example application: 
* saves the nmap scan results to the PostgreSQL
* generates a report for open ports and sends it to telegram

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install nmap-crud --save
```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [body-parser](https://ghub.io/body-parser): Node.js body parsing middleware
- [cors](https://ghub.io/cors): Node.js CORS middleware
- [express](https://ghub.io/express): Fast, unopinionated, minimalist web framework
- [node-nmap](https://ghub.io/node-nmap): Interfaces with locally installed NMAP
- [pg](https://ghub.io/pg): PostgreSQL client - pure javascript &amp; libpq with the same API
- [pg-hstore](https://ghub.io/pg-hstore): An module for serializing and deserializing JSON data in to hstore format
- [sequelize](https://ghub.io/sequelize): Multi dialect ORM for Node.JS
- [telegraf](https://ghub.io/telegraf): Modern Telegram Bot Framework

## Dev Dependencies

None

## License

ISC
