# Automation Test Project
UI automation for EngageSphere app, part of Test Design Masterclass course from Talking About Testing shool.

## Getting Started
Install dependencies and start API server and UI: `npm install && npm run install:and:start:all`

## Open with default browser
`npx cypress open`

## Open specific browser (e.g., Chrome)
`npx cypress open --browser chrome` 

## Open specific browser (e.g., Firefox)
`npx cypress open --browser firefox`

## Run all tests in Electron (default)
`npx cypress run` 

## Run all tests in Chrome
`npx cypress run --browser chrome` 

## Run all tests in Firefox
`npx cypress run --browser firefox` 

## Run all API tests
`npx cypress run --spec "cypress/e2e/api/*"`
