const { expect } = require("chai");
const Joi = require("joi");
const joiAssert = require("joi-assert");

const weather_schema = require('../../schemas/schemas');

describe('Open Weather', () => {
  
  it('Validar status 200 quando latitude e longitude válidas', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.embuGuacu.latitude, this.city.embuGuacu.longitude)
        .then((response) => {
          expect(response.status).to.equal(200);
      })
    })
  })

  it('Validar status 400 quando latitude for inválida', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.invalidValue, this.city.embuGuacu.longitude, false)
        .then((response) => {
          expect(response.status).to.equal(400);
      })
    })
  })

  it('Validar status 400 quando longitude for inválida', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.embuGuacu.latitude, this.city.invalidValue, false)
      .then((response) => {
        expect(response.status).to.equal(400);
      })
    })
  })

  it('Validar status 400 quando latitude for null', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(null, this.city.embuGuacu.longitude, false)
      .then((response) => {
        expect(response.status).to.equal(400);
      })
    })
  })

  it('Validar status 400 quando longitude for null', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.embuGuacu.latitude, null, false)
      .then((response) => {
        expect(response.status).to.equal(400);
      })
    })
  })

  it('Validar status 401 quando API Key inválida', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.embuGuacu.latitude, this.city.embuGuacu.longitude, false, this.city.invalidValue)
      .then((response) => {
        expect(response.status).to.equal(401);
      })
    })
  })

  it('Validar cidade com nome "Itupeva" com campos em pt_br', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeatherWithLang(this.city.itupeva.latitude, this.city.itupeva.longitude, false, 'pt_br')
      .then((response) => {
        expect(response.body.weather['0'].description).to.equal('céu limpo');
      })
    })
  })

  it('Verificar cidade com nome "Embu Guaçu"', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.embuGuacu.latitude, this.city.embuGuacu.longitude)
        .then((response) => {
          expect(response.body.name).to.equal(this.city.embuGuacu.name);
      })
    })
  })

  it('Verificar atributo "string" no campo "name"', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.itupeva.latitude, this.city.itupeva.longitude)
        .then((response) => {
          // expect(response.body.name).be.a('string');
          Joi.assert(response.body.name, Joi.string());
      })
    })
  })

  it('Valida schema da resposta', () => {
    cy.fixture('citys').as('city').then( function () {
      cy.getWeather(this.city.itupeva.latitude, this.city.itupeva.longitude)
        .then((response) => {
          const data = response.body;
          joiAssert(data, weather_schema);
      })
    })
  })

})