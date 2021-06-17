### Polyfill of asynchronous functions

This "polyfill" does not find any practical application, because it's hard to find a development environment that supports ES6 (function generator and promise), but not ES7 (async await).

Imagine that instead of "async" you use "*", and instead of "await" - " yield".

Errors at the stage of executing asynchronous tasks in promise can be delegated to an iterator object (iterator.throw()). All errors will be handled by the try-catch code block.

    /**
     * @function request - the generator function simulating the operation of async await
     * @param {string} url - url address
     * @returns {undefined}
     * */

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
   
You can use a special function for this - request.
It accepts a generator function, a url, and a callback function.
Returns a Promise, but you can ignore it and pass all the logic of working with the received data to the callback function.
Both options are possible.

    /**
     * @function request - A function that provides functionality for working with asynchronous code in a synchronous style
     * @param {GeneratorFunction} generator - the generator function that performs the main logic of operation
     * @param {string} url - url address
     * @param {Function} callback - callback function
     * @returns {Promise}
     */
     
     function request(generator, url, callback) {
         const iterator = generator(url, callback);
         return Promise.resolve(iterator.next())
             .then(({ value }) => value)
             .then((response) => iterator.next(response))
             .then(({ value }) => value)
             .then((data) => iterator.next(data))
             .catch((error) => iterator.throw(error));
     }
     
     /**
      * @function getData - the generator function simulating the operation of async await
      * @param {string} url - url address
      * @param {Function} callback - callback function
      * @returns {Promise, Object} - in this example, it will return Promise
      */
      
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