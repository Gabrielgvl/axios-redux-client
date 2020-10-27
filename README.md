# Axios Redux Client
📜 Client for Axios, with built-in integration for Redux.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

💡 This package will reduce your work when configuring Redux's environment. You will be able to make fast requests with very little configuration and it will save it directly to Redux's store. Also, it is fully compatible with hooks!

## 🛠 Installation

NPM:

```sh
npm install axios-redux-client --save
```

Yarn:

```sh
yarn add axios-redux-client
```

## 📈 Examples

#### Quick Start

- ##### index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import AxiosClient from 'axios-redux-client';

const config = {
  queries: {
    getObjects: {
      url: '/object', method: 'GET',
    },
  },
  baseUrl: 'http://localhost:8080',
  auth: 'jwt',
};

ReactDOM.render(
  <AxiosClient config={config}>
    <MyComponent />
  </AxiosClient>,
document.getElementById('root'),
```

- ##### MyComponent.js

```react
import React from 'react';
import { useQuery } from 'axios-redux-client';

const MyComponent = () => {
    const [{data}] = useQuery('getObjects');
    
    return (
    	<div>My objects = {data} </div>
    )
}
```

#### Full Config

- ##### index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import AxiosClient from 'axios-redux-client';

const config = {
  queries: {
    getObjects: {
      url: '/object',
       method: 'GET', 
       idProperty: "id",
       sortComparer: (a, b) => a.name.localeCompare(b.name),
    },
    login: {
      url: '/login',
      method: 'POST',
    },
  },
  cruds: {
     crudBasic: {
      url: "/basic",
      idProperty: '_id',
      sortComparer: (a, b) => a.name.localeCompare(b.name),
    },
     crudComplex: {
         url: "/complex",
         idProperty: '_id',
         sortComparer: (a, b) => a.value - b.value,
         deleteUrl: "/complex/delete/&{id}",
     }
  },
  responseHandler = ({ response, queryName }) => response.status === 200 ? console.log(queryName + " worked!") : console.log(response)
  baseUrl: 'http://localhost:8080',
  auth: 'jwt',
};

ReactDOM.render(
  <AxiosClient config={config}>
    <MyComponent />
  </AxiosClient>,
document.getElementById('root'),
```

- ##### MyComponent.js

```react
import React from 'react';
import { useQuery, useList, usePost } from 'axios-redux-client';

const MyComponent = () => {
    const [{data, loading, error}] = useQuery('getObjects');
    const [{data, error}] = useList('crudComplex');
    const [{data, loading}, post] = usePost('crudBasic');
    
    return (
    	<div>My objects = {data} </div>
    )
}
```

#### 

## 💻 API

This package have the following exports:

```react
import AxiosClient, { useQuery,  useEdit, useGet, useList, 
                     usePost, useQuery, useReadCache, useWriteCache } from 'axios-redux-client';
```

- #### Axios Client

  Provides Axios Client Context.

  - `config` - A Config Object.
  - `children` - React Node.

- #### useQuery

  Hook used for base queries.

  - `queryName` - Query's name which was declared in the Config Object.
  - `props` - Props passed to the query. Available props are: `manual`(false if the query is executed automatically. Default: false), `params` (Parameters passed to query string) and `options` (Same as Axios options). 

  ##### Returns `[{data, loading, error, response}, refetch]`:

  - `data` - Data from response.
  - `loading` - True if is fetching.
  - `error` - Response Error.
  - `response` - Whole response.

- #### useEdit, useGet, useList, usePost

  This hooks are used for crud queries.

  - `queryName` - Query's name which was declared in the Config Object.
  - `props` - Props passed to the query. Available props are: `manual`(false if the query is executed automatically. Default: false), `params` (Parameters passed to query string) and `options` (Same as Axios options). 

  ##### Returns `[{data, loading, error, response}, refetch]`:

  - `data` - Data from response.
  - `loading` - True if is fetching.
  - `error` - Response Error.
  - `response` - Whole response.

- #### useReadCache

  Hook used for retrive data from store.

  - `queryName` - Query's name which was declared in the Config Object.
  - `id` - Entity's id, if any. 

  ##### Returns `{ selectedAll, selectedById }`:

  - `selectedAll` - All data related to the query passed on parameters.
  - `selectedById` - If id was passed on params, it will return the data where idProperty === id.

- #### useWriteCache

  Hook used for retrive data from store.

  - `queryName` - Query's name which was declared in the Config Object.

  ##### Returns `{ selectedAll, selectedById }`:

  - `addOne(data)` - Add entity related to queryName.
  - `addMany(array)` - Add an array of entities to queryName.
  - `setAll(array)` - Replace current entities with array passed.
  - `upsertOne(data)` - If entity with that id exists it will updated it, else, it will be added.
  - `upsertMany(data)` - Upsert an array of entities to queryName.
  - `removeOne(id)` - Remove from queryName by ID.
  - `removeAll()` - Remove all from queryName.



## 🛠 Config

The config object accepts five configurations.

- `queries` - An object like:

  ```javascript
   [queryName]: {
         url: string, \\ query's endpoint
         method: 'GET' | 'POST' | 'PUT' | 'DELETE', \\ query's method
         idProperty: string, \\ entity's identificator - not required, however if not passed it won't save to store!
         sortComparer: (a, b) => number, \\ Function to compare and sort entities - not required
      }
  ```

- `cruds` - An object like:

  ```javascript
   [queryName]: {
         url: string, \\ query's endpoint
         idProperty: string, \\ entity's identificator - not required, however if not passed it won't save to store!
         sortComparer: (a, b) => number, \\ Function to compare and sort entities - not required
         getUrl: string, \\ get endpoint - not required; default = "/url/&{id}"
         listUrl: string, \\ list endpoint - not required; default = "/url"
         postUrl: string, \\ post endpoint - not required; default = "/url/&{id}"
         deleteUrl: string, \\ delete endpoint - not required; default = "/url/&{id}"
         putUrl: string, \\ put endpoint - not required; default = "/url/&{id}"
      }
  ```

- `baseUrl` - The host url.

- `responseHandler` - A function which passes `{ response, queryName: string, jwtAuth }` for handling the responses.

- `auth` - Auth used. Currently only supports JWT, using [@gabrielgvl/jwt-auth-react](https://github.com/Gabrielgvl/jwt_auth_react).

## 🗃 Changelog

* 0.1.0
    * First release!
* 0.0.1
    * WIP

## 📋 About

Gabriel Vinhaes de Lima – @[kvlao](https://twitter.com/kvlao) – gvl_br@yahoo.com.br

License: MIT

https://github.com/Gabrielgvl/axios-redux-client