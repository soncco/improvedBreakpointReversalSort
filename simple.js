const doReversal = (pi, [i, j]) => {
    const first = pi.slice(0, i-1);

    let middle = pi.slice(0, j);
    middle.splice(0, i-1);
    middle.reverse();

    let last = [...pi];
    last.splice(0, j);
    return [...first, ...middle, ...last];
}

let simpleReversalSort = (pi) => {
    arreglo(pi);
    const identity = [...pi];
    identity.sort((a,b) => a - b);
    for(let i=1; i <= pi.length; i++) {
        const j = pi.indexOf(i)+1;
        if(j!=i) {
            pi = doReversal(pi, [i, j]);
            console.log(pi, 'rev', [i,j]);
            mostrar(pi, [i,j]);
        }
        if(pi == identity) {
            console.log('ordenado:', pi)
            return pi;
        }
    }
}

const form = document.getElementById('form');
const n = document.getElementById('n');
const arr = document.getElementById('arr');
const clean = document.getElementById('clean');

const resultado = document.getElementById('resultado');
const piEl = document.getElementById('pi');
const pasos = document.getElementById('pasos');

clean.addEventListener('click', () => {
    location.reload();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.clear();

    let pi = [];

    if(n.value != '') {
        pi = makePermutation(parseInt(n.value));
        simpleReversalSort(pi);
    }

    if(arr.value != '') {
        pi = arr.value.split(',');
        pi = pi.map(i => parseInt(i));
        simpleReversalSort(pi);
    }

    return false;
});


let arreglo = (pi) => {
    piEl.textContent = pi.join(',');
}

let mostrar = (pi, [i,j]) => {
    const li = document.createElement('li');
    const res = document.createTextNode(pi.join(',') + ` rev: ${i}, ${j}`);
    li.appendChild(res);
    pasos.appendChild(li);
}
