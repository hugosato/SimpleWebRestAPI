SimpleWebRestAPI
-----------------
This project is inteded for teaching purposes of these topics: 
1. minimalist backend stack for a HTTPS RESTful API.
2. documentation
3. open source

Design notes
------------
The backend stack is based on:
- nginx for reverse proxy (i.e.: acts on-behalf of the client for internal services) and true http server (e.g.: ssl support);
- nodejs + [expressjs](http://expressjs.com/) for lightweight web-server development;
- sqlite3 for a simple serverless database;

Code layout
-----------

First, the boilerplate was generated using IntelliJ NodeJS express plugin. 

### models, views, and controllers folders
The architecture follows a typical MVC pattern:
- Controllers are responsible to process API calls;
- Model is the data abstraction layer;
- View is not currently implemented because we return JSON objects only.

### backend folder

We break down controllers into calls to subcomponents in `backend`. A sub-component implements a common interface to typical internal services (e.g.: database, pub-sub bus, etc).

Files under `backend/` can be seen as factories for interfaces. Particular implementation for these interfaces are under their respective subpackages.

Requirements for MacOS development environment
----------------------------------------------

- nginx with TLS support for SSL
- openssl for generating certificates
- NodeJS and NPM
- [sqlite3 module](https://www.npmjs.com/package/sqlite3)

As version goes, I've used the latest to this date.

Requirements for production
---------------------------

### Building dependencies
If your production environment is a bare Linux machine. Because the runtime dependency is small, I'd recommend just installing each runtime dependency with the respective distribution package manager (e.g.: yum, apt-get, etc.)

You may decide to run `npm install` from a build machine (e.g.: no access to npm public registrar) or in the production environment for simplicity.

### Runtime dependencies

Similar to development environment. Only exception is, depending on where you host the webserver, nginx may not be required (e.g.: heroku has its own HTTP frontend, so just update the webserver to bind against the environment variable named PORT.)

Make sure you set `ENV=production` before launching web server.

Start-up to HTML & API usage
-----------------------------

To start the web-server make sure all node modules are installed via `npm install`, set the appropriate environment variables then run `./bin/start-server` script. 

For example in development with debug enabled for `start-server` namespace:

```bash
DEBUG=SimpleWebRestAPI:start-server PORT=5000 ENV=development ./bin/start-server
```

Refer to [start-server](https://github.com/hugosato/SimpleWebRestAPI/blob/master/bin/start-server) script for a details.

### API Endpoints

#### HTTP GET `[baseurl]/smallshop/product` 

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

#### HTTP GET `[baseurl]/smallshop/product/:id`

Returns detailed info of a specific product, query by name. 
 
Taking same configuration above, the request to `http://localhost:5000/smallshop/product/apple` returns
```json
{
    "price": 0.6,
    "stock": 5
}
```

#### HTTP GET `[baseurl]/smallshop/total?cart[]=id`
 
Returns for total cost of an array of products identified by name.
 
Taking same configuration above, `[baseurl]/smallshop/total?cart[]=apple&cart[]=orange` returns `0.85`.

#### Response format

We only support JSON and JSONP format for now. For JSONP padding, use querystring param named `callback`.

### HTML Endpoints

`[baseurl]/smallshop`: a tasteless index.html

TODO
----

### Feature work (dependency ordered)
1. SSL and user authentication via OAuth.
2. Integrate sqlite3.
3. Process HTTP request to identify user
4. Process HTTP request to identify client (e.g.: extract accepted formats via [Accept](https://github.com/jshttp/accepts))
5. Create web client using API asynchrously. 

### Testing
1. Create web client for integration tests of the REST API. 
2. Unit tests.

### Site reliability
1. Add instrumentation for monitoring production.

What, this **** is Copyright'ed?! 
---------------------------------

Yes, all the source code published here under copyrights. If you are not familiar with the general aspects of Open Source this may seem weird... so keep calm and read on...

*The copyright is in place to make the source code subject to an [OSI Open Source license](http://opensource.org/licenses)* 

Albeit being a simple project created for teaching purposes because I wanted to have an **OSI** license since **public domain** may not be "precise enough" (see [FAQ](http://opensource.org/faq#public-domain).) 

Moreover, I wanted to raise awareness that **publicly published source code under copyright proctection** is not necessarily an Open Source w.r.t. *redistribution* and *derivative work* terms. 

For example, MS-DOS was recently made public under [MICROSOFT RESEARCH LICENSE AGREEMENT | Microsoft DOS V1.1 and V2.0](http://www.computerhistory.org/atchm/microsoft-research-license-agreement-msdos-v1-1-v2-0/) license. It is great to have access to that information, still the _Software Right of Use_ restricts derivative work from being published. Also, as I understand from "you *may not* redistribute" clause, you implicitly assume a potential liability for the recipient's usage, in case the original license is not disclosed even if not intentionally.

Take a look at the general [definition](http://opensource.org/osd-annotated) for more rationale. 

Lastly, I am not a lawyer :)
