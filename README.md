# Getting Started

This is a web application project that lists employees from Bitrix24.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 20.x.x

## Installation & Configuration

- Clone the repository

```
git clone  https://github.com/ssang-hub/AASC_TEST.git <project_name>
```

- Install dependencies

```
cd <project_name>
```

```
yarn install
```

- Change files `.env.example` to `.env`
- Update the `REACT_APP_ACCESSTOKEN` variable in the `.env` file  to match the `token` retrieved from

```
https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66b40399de0b85.69000599
```

## Running the Application

- Run client

```
yarn start
```

Your application will be available at http://localhost:3000.
