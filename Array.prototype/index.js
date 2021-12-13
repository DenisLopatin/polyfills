'use strict';

/**
 * @function forEach - Polyfill for forEach
 * @param { * } value - current array
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

/**
 * @function every - Polifyl for every
 * @param { * } value - current value (prefer - array)
 * @param { function } callback - callback function (element, index, currentArray)
 * @param { object } context - context for calling the function
 * @returns { boolean } - true or false
 */

function every(value, callback, context) {
    'use strict';
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

/**
 * @function reduce - Polifyl for reduce
 * @param { * } value - current value (prefer - array)
 * @param { function } callback - callback function (element, index, currentArray)
 * @param { object } context - context for calling the function
 * @returns { * } - value
 */

 function reduce(value, callback, initial) {
    'use strict';
    var current = Object(value);
    var length = current.length;
    var index = 0;
    var accumulator;
    var item;
    var isEmpty;

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
        for (index in current) {
            isEmpty = false;
            accumulator = current[index++];
            break;
        }
        if (isEmpty === undefined) {
            throw new Error('Reduce of empty array with no initial value');
        }
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
