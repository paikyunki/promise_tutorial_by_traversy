/** @member {Object} */
var XMLHttpRequest = require('xhr2');

function getData(action, url) {
    var myFirstPromise = new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(action, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300 ) {
                resolve(xhr.response);
            }
            else {
                reject('Rejected! Error during onload: ' + xhr.statusText);
            }
        };
        xhr.onerror = function() {
            reject('Error onerror: ' + xhr.statusText);
        };
        xhr.send();
    });
    return myFirstPromise;
}

function displayData(data) {
    let todos = JSON.parse(data);
    for (let todo of todos) {
        console.log(todo);
    }
}

getData('GET', 'https://jsonplaceholder.typicode.com/todos')
    .then((data) => {
        displayData(data);
        console.log('\nNow chaining another promise!\n');
        return (getData('GET', 'https://jsonplaceholder.typicode.com/users'));
    })
    .then ( (data) =>  {
        displayData(data);
        return (getData('GET', 'https://jsonplaceholder.typicode.com/albums'));
    })
    .then ( (data) =>  {
        displayData(data);
     })
    .catch(function(err) {
            console.log(err);
        }
    );