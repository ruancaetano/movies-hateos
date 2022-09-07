<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Preconfigured structures

- Code Style: Husky + Eslint + Prettier
- Typeorm (migration and seeds support)
- ConfigModule (enverioment variable managment)
- ThrottlerGuard (rate limit middleware)
- Compression middleware
- Swagger

<hr />

## Installation

```bash
$ yarn install
```

## Setup database

```bash
# start database container
  docker-compose up postgres -d

# drop + run migration + run seed
  yarn setup:dev
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
