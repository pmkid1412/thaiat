## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ docker compose -f docker/docker-compose.local.yml --env-file docker/.env.dev up -d
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment
