# Getting Started

This project involves OAuth configuration and contact management.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 20.x.x
- Install [Ngrok](https://ngrok.com/download) version 3.x.x

## Installation & Configuration

- Clone the repository

```
git clone  https://github.com/ssang-hub/AASC_TEST.git <project_name>
```

- Install dependencies on server

```
cd <project_name>
```

```
cd backend && yarn install
```

- Install dependencies on client

```
cd ../client && yarn install
```

- Rename all the `.env.example` files to `.env`

## Set up Bitrix24 OAuth

- Run backend

```
cd backend && yarn dev
```

- Run ngrok

```
ngrok http 3001
```

- Update `Initial installation path` field on the local application with the `<your_ngrok_domain>/install_app` and then click on the `reinstall/install` button.

The token will be added to the `tokens.json` file

- You can replace the values in the `.env` file with the values in `your local application`

## Running the Application

- Run backend

```
cd backend && yarn dev
```

- Run client

```
cd client && yarn start
```

Your application will be available at http://localhost:3000.
