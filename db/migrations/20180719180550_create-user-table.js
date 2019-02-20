/* eslint func-names: 0 */ // --> OFF
exports.up = function ( knex, Promise ) {
  return Promise.all( [
    knex.schema.createTable( 'users', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name', 10000 ).notNull();
      table.string( 'email', 10000 ).notNull();
      table.string( 'password', 10000 ).notNull();
    } ),
    knex.schema.createTable( 'recipes', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name', 10000 ).notNull();
      table.string( 'author', 10000 ).notNull();
      table.string( 'category', 10000 );
      table.string( 'description', 10000 );
      table.integer( 'duration' );
      table.string( 'image_url', 10000 );
      table.string( 'note', 10000 );
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'ingredients', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'name', 10000 ).notNull();
      table.string( 'units', 10000 ).notNull();
      table.float( 'quantity' ).notNull();
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'directions', ( table ) => {
      table.increments( 'id' ).primary();
      table.string( 'description', 10000 ).notNull();
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
    } ),

    knex.schema.createTable( 'favorites', ( table ) => {
      table.increments( 'id' ).primary();
      table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
      table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
    } ),

  ] );
};

exports.down = function ( knex, Promise ) {
  return Promise.all( [

    knex.schema.dropTableIfExists( 'recipes' ),
    knex.schema.dropTableIfExists( 'ingredients' ),
    knex.schema.dropTableIfExists( 'recipe_ingredient' ),
    knex.schema.dropTableIfExists( 'favorites' ),
    knex.schema.dropTableIfExists( 'users' ),
  ] );
};
