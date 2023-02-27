#!/usr/bin/env node
import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";
const timezone = moment.tz.guess()
var input = mini(process.argv.slice(2))
if (input.h){
    let message = 'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE' +
    '-h            Show this help message and exit.' + 
    '-n, -s        Latitude: N positive; S negative.' +
    '-e, -w        Longitude: E positive; W negative.' +
    '-z            Time zone: uses tz.guess() from moment-timezone by default.' +
    '-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.' +
    '-j            Echo pretty JSON from open-meteo API and exit.';
    console.log(message);
    process.exit(0);
}
let latitude = (-1) * input.w || input.e;
latitude = latitude.toFixed(2);
let longitude = (-1) * input.s || input.n;
longitude = longitude.toFixed(2);
const response_api = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&timezone=" + timezone + "&daily=precipitation_hours");
const data = await response_api.json();
const days = input.d;
if (input.j){
    console.log(data);
    process.exit(0);
}
const rain_present = data.daily.precipitation_hours[days];
if (rain_present > 0){
    process.stdout.write("You might need your galoshes");
}
else{
    process.stdout.write("You will not need your galoshes");
}
if (days == 0) {
    console.log("today.")
  } else if (days > 1) {
    console.log("in " + days + " days.")
  } else {
    console.log("tomorrow.")
  }