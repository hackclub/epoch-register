const AirtablePlus = require('airtable-plus')

const API_KEY = process.env.AIRTABLE;

export const registrationsAirtable = new AirtablePlus({
  baseID: 'appkI9bYnFceQwtx4',
  apiKey: API_KEY,
  tableName: 'Registrations',
})
