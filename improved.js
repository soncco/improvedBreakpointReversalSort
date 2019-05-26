const tieneBreakPoints = (pi) => {
    for(i = 1; i < pi.length; i++) {
        if(pi[i] != pi[i-1] + 1) {
            return true;
        }
    }
    return false;
}

const strips = (pi) => {
    const deltas = [];
    for(i = 0; i <= pi.length-2; i++) {
        deltas.push(pi[i+1] - pi[i]);
    }

    const crecientes = [];
    const decrecientes = [];
    start = 0;

    deltas.forEach((diff, i) => {
        if((Math.abs(diff) == 1) && (diff == deltas[start])) {
            return;
        }
        if(start > 0) {
            if(deltas[start] == 1) {
                crecientes.push([start, i+1]);
            } else {
                decrecientes.push([start, i+1]);
            }
        }
        start = i+1;
    })

    return {crecientes, decrecientes};

}

const crearReversion = (pi, strips) => {
    let reversal = [-1, null];
    let izquierda = [];
    let derecha = [];
    strips.forEach( item => {
        izquierda.push(item[0]);
        derecha.push(item[1]);
    });

    for(const i in izquierda) {
        const _i = izquierda[i];
        for(const j in derecha) {
            const _j = derecha[j];
            if(_i >= _j-1) {
                continue;
            }
            let breakpointsRemoved = 0;
            if(Math.abs(pi[_j-1] - pi[_i-1]) == 1) {
                breakpointsRemoved++;
            }

            if(Math.abs(pi[_j] - pi[_i]) == 1) {
                breakpointsRemoved++;
            }

            if(breakpointsRemoved > reversal[0]) {
                reversal = [breakpointsRemoved, [_i,_j]]
            }
        }
    }
    console.log(`${reversal[0]}:`);
    return reversal[1];
}

const doReversal = (pi, [i, j]) => {
    const first = pi.slice(0, i);

    let middle = pi.slice(0, j);
    middle.splice(0, i);
    middle.reverse();

    let last = [...pi];
    last.splice(0, j);
    return [...first, ...middle, ...last];
}

const improvedBreakpointReversalsort = (pi) => {
    arreglo(pi);
    while(tieneBreakPoints(pi)) {
        let { crecientes, decrecientes } = strips(pi);
        let reversal;
        if(decrecientes.length > 0) {
            reversal = crearReversion(pi, [...crecientes, ...decrecientes])
        } else {
            //console.log('0: ');
            reversal = crecientes[0];
        }
        console.log(pi, 'reversal', reversal);
        mostrar(pi, reversal);
        pi = doReversal(pi, reversal)
    }

    console.log(pi, 'Sorted');
    return;
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
        pi = makePermutation(parseInt(n.value), false);
        improvedBreakpointReversalsort(pi);
    }

    if(arr.value != '') {
        pi = arr.value.split(',');
        pi = pi.map(i => parseInt(i));
        pi = [0, ...pi, pi.length+1];
        improvedBreakpointReversalsort(pi);
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
