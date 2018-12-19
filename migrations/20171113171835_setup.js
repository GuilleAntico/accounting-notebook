exports.up = function(knex, Promise) {
  return knex
    .schema.createTable('meals', (table) => {
      table.increments('id').primary();
      table.timestamp('created', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.timestamp('modified', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.string('name').notNullable().index();
      table.string('description').notNullable();
      table.float('price', 2).notNullable().index();
    })
    .createTable('restaurants', (table) => {
      table.increments('id').primary();
      table.timestamp('created', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.timestamp('modified', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.string('comercialName').notNullable().index();
      table.string('legalName').notNullable();
      table.string('comercialEmail').notNullable().index();
      table.string('adminNumber').notNullable();
      table.string('address').notNullable();
      table.float('rating', 2).index();
      table.string('location').notNullable().index();

    })
    .createTable('reviews', (table) => {
      table.increments('id').primary();
      table.timestamp('created', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.timestamp('modified', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.string('name').notNullable();
      table.string('review').notNullable();
      table.integer('rating').notNullable().index();
      table.integer('restaurant_id').references('id').inTable('restaurants').index().onDelete('CASCADE');
    })
    .createTable('meals_restaurants', (table) => {
      table.increments('id').primary();
      table.integer('restaurant_id').references('restaurants.id').onDelete('CASCADE');
      table.integer('meal_id').references('meals.id').onDelete('CASCADE');
      table.unique('meal_id', 'restaurant_id');
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.timestamp('created', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.timestamp('modified', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable().index();
      table.string('token');
      table.string('password');
    })
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.timestamp('created', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.timestamp('modified', true).notNullable().defaultTo(knex.raw('NOW()'));
      table.string('latLng').notNullable().index();
      table.string('address').notNullable();
      table.string('eta').notNullable().index();
      table.float('total_cost', 2).notNullable();
    })
    .createTable('meals_orders', (table) => {
      table.increments('id').primary();
      table.integer('order_id').references('orders.id').onDelete('CASCADE');
      table.integer('meal_id').references('meals.id').onDelete('CASCADE');
    })
};

exports.down = function(knex, Promise) {

};
