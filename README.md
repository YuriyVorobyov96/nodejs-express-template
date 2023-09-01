# <example>Node.js Express Template</example>

## List of content
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [NPM Scripts](#npm-scripts)
4. [Architecture](#architecture)

## Features
- Layer architecture: Module-Controller-Service-Repository
- Dependency Injection and IoC via inversifyJS

## Getting Started
### Installation
```sh
yarn install
```
### Configuration
Create `local.js` file inside `config` dir:
```sh
touch config/local.js
```
Fill this file with the necessary data, e.g. provide connection info to your local database
### Run migrations
Run npm script `migrate:up` to get latest database state
```sh
npm run migrate:up
```
### Run app
Run npm script `dev` to start working
```sh
npm run dev
```

## NPM Scripts

| Script | Description |
| ------ | ------ |
| build | build ts code |
| start | run builded code |
| dev | run code with hotreload |
| inspect | run debugger |
| lint | run eslint |
| lint:fix | run eslint with autofix |
| migrate:up | run migrations |
| migrate:down | revert last migration |
| migrate:generate | generate new migration based on entities changes |
| migrate:create | create new blank migration |
| *typeorm* | *tech script used by other scripts* |

## Architecture
### Blocks
- Module - files with logic for DI
- Controller - layer with functions bound to server paths with access to the Request/Response objects
- Service - layer with business logic
- Repository - layer with database models logic
