/** @member {Object} */
var fs = require('graceful-fs');
var XMLHttpRequest = require('xhr2');

// Promise.then() executes whatever resolve() returned.
// The consumer of resolve() should have intimate understanding what resolve() is returning.
//
var myPromise = Promise.resolve('resolving to a string');  // resolve a string
myPromise.then((res) => {
    console.log('resolved: ' + res);
    return res;
})
    .then((res) => { console.log(res); return 3; })
    .then((res) => { console.log(res);  return { value: 4 };})
    .then((res) => { console.log(res); return 5; })
    .then((res) => { console.log(res); return 6; })
    .then((res) => { console.log(res);  return 7;});

