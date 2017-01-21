/**
 Returns a function which executes promises one after another. The resulting function
 returns a promise, which gets filled with an array of the results of the single promises.

 @param promiseGenerators an array of functions which return a promise
 @return function which executes the promises
 */
const enqueueWithResults = (function () {
    const fnQueue = (results, promiseGenerators) => promiseGenerators.reduce((f, promiseGenerator) => {
        return () => {
            return f().then(result => {
                results.push(result);
                return promiseGenerator();
            });
        };
    });

    return function (promiseGenerators) {
        return () => {
            const results = [];
            return fnQueue(results, promiseGenerators)().then(result => {
                results.push(result);
                return results;
            });
        };
    };
}());

module.exports = enqueueWithResults;