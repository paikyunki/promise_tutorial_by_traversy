
let myPromise = new Promise(function (resolve, reject) {
    // resolve('this is resolved!');
    reject('this is rejected!');
}) ;

myPromise.then((fulfilled) => console.log(fulfilled), (rejected) => console.log(rejected));

let myPromise2 = Promise.resolve('This is fulfilled promise');

myPromise2.then(value => console.log(value));