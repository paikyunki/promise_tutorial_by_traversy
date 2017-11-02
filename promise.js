/** @member {Object} */
var fs = require('graceful-fs');
var XMLHttpRequest = require('xhr2');

// Promise.then() executes whatever resolve() returned.
// The consumer of resolve() should have intimate understanding what resolve() is returning.
//
var myPromise = Promise.resolve('resolving to a string');  // resolve a string
myPromise.then((res) => console.log(res));

myPromise = Promise.resolve(() => console.log('resolving to a function'));  // resolve  to a function.
myPromise.then((func) => func());


// Example where resolve returns 4 asynchronously and consumed by then().
var myPromise2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(4), 2000);
});
myPromise2.then((res) => {
    res += 3;
    console.log(res);
})

function getData(method, url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        // xhr.onload = function () {
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300 ) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            })
        };
        xhr.send();
    })
}

getData('GET', 'https://jsonplaceholder.typicode.com/todos')
    .then(
        function(data) {
            let todos = JSON.parse(data);
            let output = '';
            for (let todo of todos) {
                console.log(todo);
            }
        }
    )
    .catch(function(err) {
            console.log(err);
        }
    );