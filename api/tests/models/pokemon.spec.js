const { pokemon, types, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Poke validators', () => {
    beforeEach(() => pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        pokemon.create({ name: 'Pikachu' });
      });
    });
  });

});

describe('Types model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Type validators', () => {
    beforeEach(() => types.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        types.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        types.create({ name: 'Pikachu' });
      });
    });
  });
});
