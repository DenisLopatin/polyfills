/**
 * @function request - the generator function simulating the operation of async await
 * @param {string} url - url address
 * @returns {undefined}
 */

 function* request(url) {
    try {
        const response = yield getResponse(url);
        const result = yield getData(response);
        console.log(result); // js object [{...}];
    } catch (error) {
        console.error(error);
    }
}

/**
 * @function getResponse - returns the server response
 * @param {string} url - url address
 * @returns {Promise}
 */

function getResponse(url) {
    return fetch(url)
        .then((response) => iterator.next(response))
        .catch((error) => iterator.throw(error));
}

/**
 * @function getData - returns JavaScript object with data
 * @param {Object} response - server response
 * @returns {Promise}
 */

function getData(response) {
    return response
        .json()
        .then((data) => iterator.next(data))
        .catch((error) => iterator.throw(error));
}

const iterator = request('http://jsonplaceholder.typicode.com/users');
iterator.next();

/**
 * @function request - A function that provides functionality for working with asynchronous code in a synchronous style
 * @param {GeneratorFunction} generator - the generator function that performs the main logic of operation
 * @param {string} url - url address
 * @param {Function} callback - callback function
 * @returns {Promise}
 */

/* <-- delete comment -->

function request(generator, url, callback) {
    const iterator = generator(url, callback);
    return Promise.resolve(iterator.next())
        .then(({ value }) => value)
        .then((response) => iterator.next(response))
        .then(({ value }) => value)
        .then((data) => iterator.next(data))
        .catch((error) => iterator.throw(error));
}

*/

/**
 * @function getData - the generator function simulating the operation of async await
 * @param {string} url - url address
 * @param {Function} callback - callback function
 * @returns {Promise, Object} - in this example, it will return Promise
 */

/* <-- delete comment -->

function* getData(url, callback) {
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        if (callback) callback(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

const result = request(
    getData,
    'http://jsonplaceholder.typicode.com/users',
    (data) => {
        console.log(data); // js object [{...}];
    },
);
console.log(result); // Promise

*/
