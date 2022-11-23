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
