import * as functions from 'firebase-functions';

import { AIRTABLE_API_KEY } from './keys';

import * as Airtable from 'airtable';
//const Airtable = require('airtable');


let airtable = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY
});
const base = airtable.base('appMp4kjoOG8P6axH');


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

type Location = {
  formatted_address: string,
  geometry: {
    location:
    {
      lat: string,
      lng: string
    }
  }
}

type Place = {
  location: Location,
  canCharge: 'yes' | 'no' | 'maybe'
}

type UserInput = {
  home: Place
  work: Place,
  numPassengers: number
}

export const getMatchingVehicles = functions.https.onCall(async ({ userInput }, context) => {
  const allVehicles = await getAllVehicles();
  let finalList = allVehicles.filter(filterFn(userInput))
  finalList.sort((a: any, b: any) => a.priceUsd - b.priceUsd);
  return finalList;
});

const filterFn = ({ home, work, numPassengers }: UserInput) => (vehicle: any) => {
  return vehicle.availableNow &&
    vehicle.seats >= numPassengers &&
    getDistance(home, work) < vehicle.rangeMi;
}

const getDistance = (from: Place, to: Place) => {
  return 100;
}

type Vehicle = {
  brand: string,
  model: string,
  rangeMi: number,
  seats: number,
  priceUsd: number,
  availableNow: boolean
};

const getAllVehicles = async (): Promise<Vehicle[]> => {
  const records = await base('imported3').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 100,
    fields: ['brand', 'model', 'rangeMi', 'seats', 'priceUsd', 'availableNow'],
  }).all();
  return records.map(r => r.fields as Vehicle);
}
