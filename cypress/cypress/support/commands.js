// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const API_URL = Cypress.env('API_BASE_URL')
const APP_ID = Cypress.env('APP_ID')

Cypress.Commands.add('getWeather', (latitude, longitude, failOnStatusCode=true, API_KEY=APP_ID,language) => {
    cy.request({
        method: 'GET',
        qs: { appid:API_KEY, lat:latitude, lon:longitude, lang: language},
        failOnStatusCode: failOnStatusCode,
        url: API_URL
    })
})

Cypress.Commands.add("getWeatherWithLang", (latitude, longitude, failOnStatusCode, language) => {
    cy.getWeather(latitude, longitude, failOnStatusCode, APP_ID, language);
})
