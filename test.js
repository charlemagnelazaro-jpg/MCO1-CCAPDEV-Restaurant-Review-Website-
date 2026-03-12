const movies = [
    [5, 5, 2, null, 3, 4, 2, 2],
    [null, 2, 5, 1, 2, 2, 4, null],
    [1, 3, 1, 4, 5, 5, 4, 1],
    [1, 2, 5, 3, 1, null, 4, 5],
    [5, null, 1, 4, 4, 1, 4, 3],
    [1, 5, 4, 1, 3, 5, 1, 3]
];

function mean(arr) {
    let sum = 0, count = 0;
    for (let x of arr) {
        if (x !== null) { sum += x; count++; }
    }
    return sum / count;
}

const means = movies.map(mean);
const normalized = movies.map((m, i) => m.map(x => x !== null ? x - means[i] : null));

function cosSim(v1, v2) {
    let dot = 0;
    let norm1 = 0;
    let norm2 = 0;
    // This is the implementation that pandas does with pd.Series.sum()
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== null && v2[i] !== null) {
            dot += v1[i] * v2[i];
        }
    }
    // pandas sum ignoring NaN for v1**2
    for (let x of v1) {
        if (x !== null) norm1 += x * x;
    }
    for (let x of v2) {
        if (x !== null) norm2 += x * x;
    }
    return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

function cosSimPanda(v1, v2) {
    return cosSim(v1, v2);
}

// What if we only compute norms over the intersection?
function cosSimIntersect(v1, v2) {
    let dot = 0, norm1 = 0, norm2 = 0;
    for (let i = 0; i < v1.length; i++) {
        if (v1[i] !== null && v2[i] !== null) {
            dot += v1[i] * v2[i];
            norm1 += v1[i] * v1[i];
            norm2 += v2[i] * v2[i];
        }
    }
    return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

function calculateAll(simFunc, name) {
    console.log(`\n--- ${name} ---`);
    console.log("Movie 0:", simFunc(normalized[0], normalized[4]).toFixed(2));
    console.log("Movie 1:", simFunc(normalized[1], normalized[4]).toFixed(2));
    console.log("Movie 2:", simFunc(normalized[2], normalized[4]).toFixed(2));
    console.log("Movie 3:", simFunc(normalized[3], normalized[4]).toFixed(2));
    console.log("Movie 5:", simFunc(normalized[5], normalized[4]).toFixed(2));
}

calculateAll(cosSim, "Current pandas logic (norm over all non-null)");
calculateAll(cosSimIntersect, "Intersection only norms");

// What if we use syn_df (unnormalized) with Intersection norms
const calculateAllSyn = (simFunc, name) => {
    console.log(`\n--- ${name} ---`);
    console.log("Movie 0:", simFunc(movies[0], movies[4]).toFixed(2));
    console.log("Movie 1:", simFunc(movies[1], movies[4]).toFixed(2));
    console.log("Movie 2:", simFunc(movies[2], movies[4]).toFixed(2));
    console.log("Movie 3:", simFunc(movies[3], movies[4]).toFixed(2));
    console.log("Movie 5:", simFunc(movies[5], movies[4]).toFixed(2));
}

calculateAllSyn(cosSimIntersect, "Unnormalized, intersection only norms");

function cosSimZeroFill(v1, v2) {
    let dot = 0, norm1 = 0, norm2 = 0;
    for (let i = 0; i < v1.length; i++) {
        let x = v1[i] === null ? 0 : v1[i];
        let y = v2[i] === null ? 0 : v2[i];
        dot += x * y;
        norm1 += x * x;
        norm2 += y * y;
    }
    return dot / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

calculateAll(cosSimZeroFill, "Zero fill normalized");
calculateAllSyn(cosSimZeroFill, "Zero fill unnormalized");
