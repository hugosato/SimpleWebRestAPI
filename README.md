# SimpleWebRestAPI
This is a simple project to get a simple HTTP web server stack in Heroku + nodejs + mongodb (I can't think of any acronym for such stack...)

Requirements for MacOS development environment
----------------------------------------------

- NodeJS and NPM
- [MongoDB](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)

As version goes, I've used the latest to this date.

Usage
-----
To start the web-server make sure all node modules are installed via `npm install`, then run

```bash
./bin/start-server
```

Runtime parameters are passed via environment variables

```bash
DEBUG=SimpleWebRestAPI:start-server PORT=5000 ENV=development ./bin/start-server
```

Refer to [start-server](https://github.com/hugosato/SimpleWebRestAPI/blob/master/bin/start-server) script for a details.

Design notes
------------
The application follows a typical MVC pattern:
- Controllers are responsible to process API calls;
- Model is the data abstraction layer;
- View is not currently implemented because we return JSON objects mostly.

We break down controllers into calls to `backend` sub-components. 
Each sub-component represent a internal service such as database, pub-sub bus, etc.

Code layout
-----------

First, the boilerplate was generated using IntelliJ NodeJS express plugin. 

### backend
Files under `backend/` can be seen as factories for interfaces. Particular implementation for these interfaces are under their respective subpackages.

API Endpoints
-------------

### HTTP GET `[baseurl]/smallshop/product` 

List all available products. 

For example, in the testing environment the small shop only sells apples and oranges. 
Using the server configuration above, the request to `http://localhost:5000/smallshop/product` returns

```json
{
    "apple": {
        "price": 0.6,
        "stock": 5
    },
    "orange": {
        "price": 0.25,
        "stock": 4
    }
}
```

Note that the stock can be zero to indicate a certain product is out-of-stock.

### HTTP GET `[baseurl]/smallshop/product/:id`

Returns detailed info of a specific product, query by name. 
 
Taking same configuration above, the request to `http://localhost:5000/smallshop/product/apple` returns
```json
{
    "price": 0.6,
    "stock": 5
}
```

### HTTP GET `[baseurl]/smallshop/total?cart[]=id`
 
Returns for total cost of an array of products identified by name.
 
Taking same configuration above, `[baseurl]/smallshop/total?cart[]=apple&cart[]=orange` returns `0.85`.

### Response format

We only support JSON and JSONP format for now. For JSONP padding, use querystring param named `callback`.

HTML Endpoints
--------------

`[baseurl]/smallshop`: a tasteless index.html

TODO
----

1. Support [Accept](https://github.com/jshttp/accepts) formats
2. Support MongoDB
3. Unit and integration tests
4. User identity (via OAuth)
5. Productionize to Heroku and wire with personal domain

