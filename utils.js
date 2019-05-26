const range = (start, end) => Array.from(Array(end).keys()).slice(start);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const makePermutation = (n, simple=true) => {
    let pi = shuffle(range(1, n));
    if(simple) {
        return pi;
    }
    return [0, ...pi, n];
}
