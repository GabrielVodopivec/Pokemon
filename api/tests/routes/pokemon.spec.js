/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const poke = {
  name: 'unPikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => pokemon.sync({ force: true })
    .then(() => pokemon.create(poke)));
  describe('GET /pokemons', () => {
    it('should get 200', () => {
      agent.get('/pokemons').expect(200) 
    });
  });
});
