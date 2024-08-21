# Getting Started

This is a web application project that lists employees from Bitrix24.

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

## Running the Application

- Run backend

```
cd backend && yarn start
```

- Run client

```
cd client && yarn start
```

Your application will be available at http://localhost:3000.

## Set up Bitrix24 OAuth

- Run ngrok

```
ngrok http 3001
```

- Update `Initial installation path` field with the `<your_ngrok_domain>/install_app` and then click on the 'reinstall/install' button.
