# Food Truck API

Rest API to manage restaurant, users and orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need before running the software and how to install them

- PostgreSQL
    - Create a database called "food_truck" 
    - Give Access to "postgres" user on the db 
    
### Installing


```
    npm install
    
```
Now run the migrations and seed the db
  
```
    npm run migrate:latest
    npm run seed:db

```

Finally start the project
  
```
    npm run start:dev
```

If everything worked as expected you can visit [http://localhost:5000/users](http://localhost:3001/users)
and you will get a json resposne with a user seeded.

## Author

* **Guillermo Antico** 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

