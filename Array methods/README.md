## Polyfills for array methods

These polyfills supports such old browsers as ie5 and others. Polyfills are not added to the Array.prototype, they are created as functions.

**Notice**: *All old browsers support the work of polyfills only with arrays! This doesn't work with strings and DOM etc*.

**Notice**: *Be careful with floating point. Older browsers don't support this.*

### forEach:

    /**
     * @function forEach - Polyfill for forEach
     * @param { * } value - current array (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { object } context - context for calling the function
     * @returns { undefined } - the function always returns an undefined value
     */

    function forEach(value, callback, context) {
       'use strict';
        var current = Object(value);
        var length = current.length;
        var index = 0;
        var item;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                callback.call(context, item, index, current);
            }
            index += 1;
        }
    }

Examples:

Output values.

The original method forEach:

    var array = [1, 2, 3, 4, 5];
    array.forEach(function(number) {
        console.log(number); // 1, 2, 3, 4, 5
    });
    
Polify:

    var array = [1, 2, 3, 4, 5];
    forEach(array, function(number) {
        console.log(number); // 1, 2, 3, 4, 5
    });
    
Return undefined.

The original method forEach:

    var array = [1, 2, 3, 4, 5];
    var result = array.forEach(function(number) {
        return number;
    });
    console.log(result); // undefined
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = forEach(array, function(number) {
        return number;
    });
    console.log(result); // undefined
    
### map:
    
    /**
     * @function map - Polyfill for map
     * @param { * } value - current value (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { object } context - context for calling the function
     * @returns { array } - new created array
     */

    function map(value, callback, context) {
       'use strict';
        var current = Object(value);
        var willreturn = new Array();
        var length = current.length;
        var index = 0;
        var item;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                willreturn[index] = callback.call(context, item, index, current);
            }
            index += 1;
        }
        return willreturn;
    }
    
Examples:

Multiplying numbers.

The original method map:

    var array = [1, 2, 3, 4, 5];
    var result = array.map(function(number) {
        return number * 2;
    });
    console.log(result); // [2, 4, 6, 8, 10]
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = map(array, function(number) {
        return number * 2;
    });
    console.log(result); // [2, 4, 6, 8, 10]
    
Does not output missing values.

The original method map:

    var array = [1, 2,, 3,, 4, 5];
    var result = array.map(function(number) {
        console.log(number); // 1, 2, 3, 4, 5
        return number * 2;
    });
    console.log(result); // [2, 4, empty, 6, empty, 8, 10]
    
Polyfill:

    var array = [1, 2,, 3,, 4, 5];
    var result = map(array, function(number) {
        console.log(number); // 1, 2, 3, 4, 5
        return number * 2;
    });
    console.log(result); // [2, 4, empty, 6, empty, 8, 10]
    
Working with strings.

The original method map:

    var string = 'Hello World';
    var map = Array.prototype.map;
    var result = map.call(string, function(char) {
        return char.toUpperCase();
    });
    console.log(result); // ["H", "E", "L", "L", "O", " ", "W", "O", "R", "L", "D"]
    
Polyfill:

    var string = 'Hello World';
    var result = map(string, function(char) {
        return char.toUpperCase();
    });
    console.log(result); // ["H", "E", "L", "L", "O", " ", "W", "O", "R", "L", "D"]
    
Working with DOM Elements.

HTML:

    <button>First</button>
    <button>Second</button>
    <button>Third</button>

The original method map:

    var nodes = document.getElementsByTagName('button');
    var map = Array.prototype.map;
    var result = map.call(nodes, function(node) {
        return node.textContent;
    });
    console.log(result); // ["First", "Second", "Third"]
    
Polyfill:

    var nodes = document.getElementsByTagName('button');
    var result = map(nodes, function(node) {
        return node.textContent;
    });
    console.log(result); // ["First", "Second", "Third"]
    
Doesn't working with Objects.

The original method map:

    var object = {name: 'Denis', age: 29, city: 'Moscow', length: 3};
    var map = Array.prototype.map;
    var result = map.call(object, function(property) {
        return property;
    });
    console.log(result); // [empty × 3]
    
Polyfill:

    var object = {name: 'Denis', age: 29, city: 'Moscow', length: 3};
    var result = map(object, function(property) {
        return property;
    });
    console.log(result); // []
    
Does not change the original array.

The original method map:

    var array = ['Hello World', 15];
    var result = array.map(function(item) {
        return item = null;
    });
    console.log(array); // ['Hello World', 15]
    console.log(result); // [null, null]
    
Polyfill:

    var array = ['Hello World', 15];
    var result = map(array, function(item) {
        return item = null;
    });
    console.log(array); // ['Hello World', 15]
    console.log(result); // [null, null]
    
### filter:
    
    /**
     * @function filter - Polifyl for filter
     * @param { * } value - current value (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { object } context - context for calling the function
     * @returns { array } - new created array
     */

    function filter(value, callback, context) {
       'use strict';
        var current = Object(value);
        var willreturn = new Array();
        var length = current.length;
        var index = 0;
        var item, isTrue;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                isTrue = callback.call(context, item, index, current);
                if (isTrue) {
                    willreturn.push(item);
                }
            }
            index += 1;
        }
        return willreturn;
    }
    
Examples:

Search numbers.

The original method filter:

    var array = [1, 2, 3, 4, 5];
    var result = array.filter(function (number) {
        return number > 3;
    });
    console.log(result); // [4, 5]
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = filter(array, function (number) {
        return number > 3;
    });
    console.log(result); // [4, 5]
    
Search text.

The original method filter:

    var array = ['filter', 'JavaScript', 'test'];
    var result = array.filter(function (item) {
        return item.includes('est');
    });
    console.log(result); // ['test']
    
Polyfill:

    var array = ['filter', 'JavaScript', 'test'];
    var result = filter(array, function (item) {
        return item.includes('est');
    });
    console.log(result); // ['test']
    
It can work with strings.

The original method filter:

    var string = 'Hello';
    var filter = Array.prototype.filter;
    var result = filter.call(string, function (word) {
        return word !== 'l';
    });
    console.log(result); // ["H", "e", "o"]
    
Polyfill:

    var string = 'Hello';
    var result = filter(string, function (word) {
        return word !== 'l';
    });
    console.log(result); // ["H", "e", "o"]
    
### every:

    /**
     * @function every - Polifyl for every
     * @param { * } value - current value (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { object } context - context for calling the function
     * @returns { boolean } - true or false
     */

    function every(value, callback, context) {
       'use strict'
        var current = Object(value);
        var length = current.length;
        var index = 0;
        var item, isFalse;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                isFalse = callback.call(context, item, index, current);
                if (!isFalse) {
                    return false;
                }
            }
            index += 1;
        }
        return true;
    }
    
Examples:

Checking the numbers.

The original method every:

    var array = [1, 2, 3, 4, 5];
    var result = array.every(function(number) {
        return number > 0;
    });
    console.log(result); // true
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = every(array, function(number) {
        return number > 0;
    });
    console.log(result); // true
    
It can work with strings.

The original method every:

    var string = 'Hello';
    var every = Array.prototype.every;
    var result = every.call(string, function(item) {
        return item === 'l';
    });
    console.log(result); // false
    
Polyfill:

    var string = 'Hello';
    var result = every(string, function(item) {
        return item === 'l';
    });
    console.log(result); // false
    
### some:

    /**
     * @function some - Polifyl for some
     * @param { * } value - current value (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { object } context - context for calling the function
     * @returns { boolean } - true or false
     */

    function some(value, callback, context) {
       'use strict';
        var current = Object(value);
        var length = current.length;
        var index = 0;
        var item, isTrue;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                isTrue = callback.call(context, item, index, current);
                if (isTrue) {
                    return true;
                }
            }
            index += 1;
        }
        return false;
    }
    
Examples:

Checking the numbers.

The original method some:

    var array = [1, 2, 3, 4, 5];
    var result = array.some(function(number) {
        return number > 4;
    });
    console.log(result); // true
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = some(array, function(number) {
        return number > 4;
    });
    console.log(result); // true
    
It can work with strings.

The original method filter:

    var string = 'Hello';
    var some = Array.prototype.some;
    var result = some.call(string, function(item) {
        return item === 'l';
    });
    console.log(result); // true
    
Polyfill:

    var string = 'Hello';
    var result = some(string, function(item) {
        return item === 'l';
    });
    console.log(result); // true
    
### reduce:
    
    /**
     * @function reduce - Polifyl for reduce
     * @param { * } value - current value (prefer - array)
     * @param { function } callback - callback function (element, index, currentArray)
     * @param { * } initial - the initial value of the accumulate 
     * @returns { * } - value
     */

    function reduce(value, callback, initial) {
       'use strict';
        var current = Object(value);
        var length = current.length;
        var index = 0;
        var accumulator;
        var item;

        if (arguments.length < 2) {
            throw new Error(
                'This function accepts two required arguments - value and function. You passed: ' +
                    typeof arguments[0] +
                    ' and ' +
                    typeof arguments[1]
            );
        }

        if (typeof callback !== 'function') {
            throw new Error(
                'The second argument must be a function. You passed: ' +
                    typeof callback
            );
        }

        if (arguments.length === 3) {
            accumulator = initial;
        } else {
            accumulator = current[index++];
        }

        while (index < length) {
            if (index in current) {
                item = current[index];
                accumulator = callback(accumulator, item, index, current);
            }
            index += 1;
        }
        return accumulator;
    }
    
Examples:

Summing all the values in an array.

The original method reduce:

    var array = [1, 2, 3, 4, 5];
    var result = array.reduce(function(a, b) {
        return a + b;
    });
    console.log(result); // 15
    
Polyfill:

    var array = [1, 2, 3, 4, 5];
    var result = reduce(array, function(a, b) {
        return a + b;
    });
    console.log(result); // 15
    
Summing values in an array of objects.

The original method reduce:

    var array = [{ value: 10 }, { value: 20 }, { value: 30 }];
    var result = array.reduce(function (accumulator, obj) {
        return accumulator + obj.value;
    }, 0);
    console.log(result); // 60
    
Polyfill:

    var array = [{ value: 10 }, { value: 20 }, { value: 30 }];
    var result = reduce(
        array,
        function (accumulator, obj) {
            return accumulator + obj.value;
        },
        0
    );
    console.log(result); // 60
