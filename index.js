const PREFIXES = {
    '24': 'Y',
    '21': 'Z',
    '18': 'E',
    '15': 'P',
    '12': 'T',
    '9': 'G',
    '6': 'M',
    '3': 'k',
    '0': '',
    '-3': 'm',
    '-6': 'µ',
    '-9': 'n',
    '-12': 'p',
    '-15': 'f',
    '-18': 'a',
    '-21': 'z',
    '-24': 'y'
};


const MULTIPLIERS = {
    Y: 1e24,
    Z: 1e21,
    E: 1e18,
    P: 1e15,
    T: 1e12,
    G: 1e9,
    M: 1e6,
    k: 1e3,
    '': 1,
    m: 1e-3,
    µ: 1e-6,
    u: 1e-6,
    n: 1e-9,
    p: 1e-12,
    f: 1e-15,
    a: 1e-18,
    z: 1e-21,
    y: 1e-24
};

const defaultOpts = {
    decimals: 3,
    space: ' ' // Default: NARROW NO-BREAK SPACE
};


function getOption (opts, option) {
    return opts[option] === undefined ? defaultOpts[option] : opts[option];
}


/**
 * Format a value with SI prefix
 * @param {*} num The number to format
 * @param {*} opts Options:
 *  decimals: How many decimal places to display max
 *  space: The whitespace inserted between value and und. Defaults to one UTF-8 NARROW NO-BREAK SPACE
 */
function formatSI (num, opts = {}) {
    if (num === 0) {
        return '0';
    }
    let sig = Math.abs(num); // significand
    let exponent = 0;
    while (sig >= 1000 && exponent < 24) {
        sig /= 1000;
        exponent += 3;
    }
    while (sig < 1 && exponent > -24) {
        sig *= 1000;
        exponent -= 3;
    }

    const signPrefix = num < 0 ? '-' : '';
    if (sig > 1000) { // exponent == 24
        // significand can be arbitrarily long
        return signPrefix + sig.toFixed(0) + PREFIXES[exponent];
    }
    return signPrefix +
        parseFloat(sig.toPrecision(getOption(opts, 'decimals'))) +
        getOption(opts, 'space') +
        PREFIXES[exponent];
}

// For NodeJS only
if (typeof module !== 'undefined') {
    module.exports = {
        formatSI: formatSI
    };
}
