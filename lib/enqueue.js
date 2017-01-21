/**
    returns a function which executes promises one after another

    @param promiseGenerators an array of functions which return a promise
    @return function which executes the promises
 */
function enqueue (promiseGenerators) {
    return promiseGenerators.reduce((f, promiseGenerator) => {
        return () => {
            return f().then(promiseGenerator);
        };
    });
}

module.exports = enqueue;