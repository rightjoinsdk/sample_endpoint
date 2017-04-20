# RightJoin's API Sample Integration

Introduction
============
Before you request data from RightJoin's API, you first need to have and EndPoint to use it as a call back function, in order to receive the record's as streams. You'll also need to login to obtain an [access token], that you will use to submit data service requests from RightJoin's API.

Following steps detail what you need in order to successfully call RightJoin's API. In our sample case [LeftJoin] is a [Customer] of RightJoin and with a valid registered user [john@doe.com], they wish to integrate an application to RightJoin's Data Services, in order to receive data streams in real time from their own Customer's records.

Setup your EndPoint
===================
RightJoin's sample of an endpoint's call back function written in NodeJS and is called `server.js`.
To install it, first clone or download the .zip file of [This Repo](https://github.com/rightjoinsdk/sample_endpoint).

Type the following command lines at your terminal to install Node dependencies:
```
npm install http
npm install querystring
npm install utlis
npm install express
```

Type the following command line to start your `server.js` listening on `port 4500`. If you want to change the port, just edit `server.js` file at will.

```
npm start
```
After this you will have a message in your terminal like this:
```
App is runing, server is listening on port 4500
```

Login to RightJoin thru the API
===============================
Another requeriment
