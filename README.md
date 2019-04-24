# Articles API

Rest API to manage articles and users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What you need before running the software

- Node
    - Check you node version, you need >= 0.10.5
- Mongodb
    - Create a database called "articles" 
    
## Installing


```
    npm install
    
```
## Running 
 start the project
  
```
    npm run start:dev
```

If everything worked as expected you can visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
and you will get a swagger playground.

## Swagger
Since the API is private you'll need to authenticate before using it.
When you open the swagger ui playground on the top right you'll find an `Authorize` button.
Add the following apiKey `5CD4ED173E1C95FE763B753A297D5`. Now you can use it.

Note: if you want to you the api through Postman, add the following header.
`Authorization -> 5CD4ED173E1C95FE763B753A297D5` ( not bearer, just the key). 
## Testing

To run the unit testing suit just run.
```
    npm run unit:test
```
## Author

* **Guillermo Antico** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

