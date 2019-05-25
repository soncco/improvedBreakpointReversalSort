const range = (start, end) => Array.from(Array(end).keys()).slice(start);

const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const makePermutation = (n) => {
    let seq = shuffle(range(1, n));
    return [0, ...seq, n];
}

const hasBreakpoints = (seq) => {
    for(i = 1; i < seq.length; i++) {
        if(seq[i] != seq[i-1] + 1) {
            return true;
        }
    }
    return false;
}

const getStrips = (seq) => {
    const deltas = [];
    for(i = 0; i <= seq.length-2; i++) {
        deltas.push(seq[i+1] - seq[i]);
    }

    const increasing = [];
    const decreasing = [];
    start = 0;

    deltas.forEach((diff, i) => {
        if((Math.abs(diff) == 1) && (diff == deltas[start])) {
            return;
        }
        if(start > 0) {
            if(deltas[start] == 1) {
                increasing.push([start, i+1]);
            } else {
                decreasing.push([start, i+1]);
            }
        }
        start = i+1;
    })

    return {increasing, decreasing};

}

const pickReversal = (seq, strips) => {
    let reversal = [-1, null];
    let left = [];
    let right = [];
    strips.forEach( item => {
        left.push(item[0]);
        right.push(item[1]);
    });

    for(const i in left) {
        const _i = left[i];
        for(const j in right) {
            const _j = right[j];
            if(_i >= _j-1) {
                continue;
            }
            let breakpointsRemoved = 0;
            if(Math.abs(seq[_j-1] - seq[_i-1]) == 1) {
                breakpointsRemoved++;
            }

            if(Math.abs(seq[_j] - seq[_i]) == 1) {
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

const doReversal = (seq, [i, j]) => {
    const first = seq.slice(0, i);

    let middle = seq.slice(0, j);
    middle.splice(0, i);
    middle.reverse();

    let last = [...seq];
    last.splice(0, j);
    return [...first, ...middle, ...last];
}

const improvedBreapointReversalsort = (seq) => {
    while(hasBreakpoints(seq)) {
        let { increasing, decreasing } = getStrips(seq);
        let reversal;
        if(decreasing.length > 0) {
            reversal = pickReversal(seq, [...increasing, ...decreasing])
        } else {
            console.log('0: ');
            reversal = increasing[0];
        }
        console.log(seq, 'reversal', [seq[reversal[0]], seq[reversal[1]]], reversal);
        seq = doReversal(seq, reversal)
    }

    console.log(seq, 'Sorted');
    return;
}


//let seq = [0,1,2,3,4,5,6,7];
const n = prompt('Ingresa la longitud de la permutación');
let seq = makePermutation(parseInt(n));
//let seq = [0, 3, 2, 1, 4, 6, 5, 7, 8];
improvedBreapointReversalsort(seq);