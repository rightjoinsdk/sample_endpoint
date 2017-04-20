# RightJoin's API Sample Record Streaming Integration

Introduction
============
Before you request data from RightJoin's API, you first need to have and EndPoint to use it as a call back function, in order to receive the records as streams. You'll also need to login to obtain an [access token], that you will use to submit data service requests from RightJoin's API.

Following steps detail what you need in order to successfully call RightJoin's API. In our sample case [LeftJoin] is a [Customer] of RightJoin and with a valid registered user [john@doe.com], they wish to integrate an application to RightJoin's Data Services, in order to receive data streams in real time from their own Customer's records.

Note: most sample lines of command in terminal console included in this document uses `curl` as a tool, but you might want to test the code with the commands and tools of your choice.

Setup your EndPoint
===================
RightJoin's sample of an endpoint's call back function written in NodeJS and is called `server.js`.
To install it, first clone or download the .zip file of [This Repo](https://github.com/rightjoinsdk/sample_endpoint).

Type the following command lines at your terminal to install Node dependencies:
```
npm install http
npm install querystring
npm install utils
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

Login to RightJoin with the API
===============================
Type the following `curl` command at your terminal console, in order to obtain your `access token`. All further data service request, require a valid `access token`:

```
curl -v -H "Content-Type: application/json"
     -X POST
     -d '{"user_email": "john@doe.com",
          "password": "temp",
          "call_back": "http://<YOUR-HOST-HERE>:<YOUR-PORT-HERE>/data"}'
     https://api.rightjoin.io/rjclient/user
```
Alternatively, you might want to adjust `server.js` to reflect a different port number or to change the endpoint folder of `/data` into something more meaningful to you.

If succeed, you will receive a message in your terminal console similar to this:
```
{
   "id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JpZ2h0am9pbi5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTdjZGQwMjAyZmRmODIyOTI3MzZkYTZhIiwiYXVkIjoiT2hxTFdldmcwZndFVGIwRmRvZmU0ejRhNDd5dHFPVHQiLCJleHAiOjE0OTI3Mjg4NzEsImlhdCI6MTQ5MjY5Mjg3MX0.U-Yrspd_Ykzscyp5dtYYVVwue9ra0xvbeKbE9Ab6w-M",
   "access_token": "RUBCG2g1lySXRdZZ",
   "token_type": "bearer"
}
```
The important data element here is the `access_token`. Access tokens are set to expire after some time, depending on RightJoin's Customers requirements.

Request Data from RightJoin's API
=================================
Before you submit a request for data services to RightJoin's API, you will need to [ingest] your record as a [JSON] string. In our sample case the following record will be ingested into the RightJoin's call:
```
{
  "firstName": "John",    
  "lastName": "Doe",    
  "email": "john@doe.com",    
  "State": "CA",    
  "City": "San Francisco",    
  "Street": "6649 BaySt",    
  "zipCode": 70116,    
  "country": "USA"
}
```
Alternatively, you might want to ingest just the data elements you wish to provide (ie. Email). Buy default, RightJoin's API prevents all requests from inadvertently ingesting [PII](https://en.wikipedia.org/wiki/Personally_identifiable_information) or Personal Identifiable Information.

When you are ready, type the following command lines into your terminal console:
```
curl -v -H "Content-Type: application/json"
     -X POST
     -d '{"access_token":"RUBCG2g1lySXRdZZ",
          "data_package_name": "leftjoin_sample_10",
          "distribution_data_package_name": "left_join_distribution_001",
          "records":
              { "firstName": "John",    
                 "lastName": "Doe",    
                 "email": "john@doe.com",    
                 "State": "CA",    
                 "City": "San Francisco",    
                 "Street": "6649 BaySt",    
                 "zipCode": 70116,    
                 "country": "USA" } }'
     http://explore.us-west-2.elasticbeanstalk.com/ingestionrequest
```
By now you should be looking at a response message in your terminal console similar to this:
```
{
   "code": 200,
   "response": "Data sent to user's provided call back endpoint."
}
```
By standard, RightJoin's API uses [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
At your `server.js` console you should have received a response message similar to this:
```
{
   "code": 200,
   "response": "success",
   "message": {
      "match": {
         "firstName": "John",
         "lastName": "Doe",
         "email": "john@doe.com",
         "State": "LA",
         "City": "San Francisco",
         "Street": "6649 BaySt",
         "zipCode": 70116,
         "country": "USA"
      },
      "results": {
         "onlineBanking": "Unlikely",
         "payBillsByAutomaticallyCharging": "",
         "payBillsOnline": "Unlikely",
         "retailBankingConsumerSegments": "Affluent Pre-Retired",
         "age": 50,
         "consumerProminenceIndicator": "Largest marketing footprint",
         "education": "High School",
         "employmentStatus": "Full time",
         "gender": "Male",
         "lengthOfResidence": 15,
         "maritalStatus": "Married",
         "occupation": "Homemaker",
         "ownerRenter": "Owner",
         "adoptionPlans": "Unlikely",
         "babyPlans": "",
         "countryOfOrigin": "England",
         "estimatedIncomeMin": 50000,
         "estimatedIncomeMax": 74999,
         "generations": 2,
         "grandchildPlans": "Somewhat likely",
         "newCareerPlans": "Unlikely",
         "numberOfAdults": 5,
         "numberOfChildren": 0,
         "numberOfPeople": 5,
         "republicanParty": "Somewhat unlikely"
      }
   }
}
```
The `code` and `message` elements are the [HTTP code], standard for all responses.
The `match` section indicates the ingested record received by RightJoin.
The `results` section indicate the data elements returned from the data service. Data elements in this section will depend on the Customer's granted Data Sets as per the RightJoin's SLA.
If succeed, you will receive one result for every ingested record.
