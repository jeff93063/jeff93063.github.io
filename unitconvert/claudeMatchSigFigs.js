function countSigFigs(str) {
  // Remove whitespace and convert to string if needed
  str = String(str).trim();

  // Handle special cases
  if (str === "0" || str === "0.0" || /^0\.0+$/.test(str)) return 1;
  if (!isFinite(parseFloat(str))) return 1;

  // Remove leading minus sign
  str = str.replace(/^-/, "");

  // Remove scientific notation for counting
  if (str.includes('e') || str.includes('E')) {
    const [mantissa] = str.split(/[eE]/);
    str = mantissa;
  }

  // Remove decimal point for easier counting
  const hasDecimal = str.includes('.');
  str = str.replace('.', '');

  // Remove leading zeros
  str = str.replace(/^0+/, '');

  // Count all remaining digits (including trailing zeros)
  return str.length || 1;
}

function toSigFigs(num, sigFigs = 2) {
  if (num === 0) return "0." + "0".repeat(Math.max(0, sigFigs - 1));
  if (!isFinite(num)) return String(num);
  if (sigFigs < 1) throw new Error("sigFigs must be at least 1");

  // Get the order of magnitude
  const magnitude = Math.floor(Math.log10(Math.abs(num)));

  // Round to the specified number of significant figures
  const factor = Math.pow(10, magnitude - (sigFigs - 1));
  const rounded = Math.round(num / factor) * factor;

  // Determine decimal places needed
  const decimalPlaces = Math.max(0, (sigFigs - 1) - magnitude);

  return rounded.toFixed(decimalPlaces);
}

function matchSigFigs(num, referenceStr) {
  const sigFigs = countSigFigs(referenceStr);
  return toSigFigs(num, sigFigs);
}

// Examples
console.log(matchSigFigs(123.456, "12"));        // "120" (2 sig figs)
console.log(matchSigFigs(123.456, "12.0"));      // "123" (3 sig figs)
console.log(matchSigFigs(123.456, "12.00"));     // "123.5" (4 sig figs)
console.log(matchSigFigs(0.00456, "1.2"));       // "0.0046" (2 sig figs)
console.log(matchSigFigs(1234567, "100"));       // "1200000" (3 sig figs)
console.log(matchSigFigs(1234567, "1.0000"));    // "1234600" (5 sig figs)
console.log(matchSigFigs(45.678, "0.500"));      // "45.7" (3 sig figs)
console.log(matchSigFigs(99.9, "1"));            // "100" (1 sig fig)
console.log(matchSigFigs(99.9, "1.0"));          // "100" (2 sig figs)

// Test the counting function
console.log("\nSig fig counts:");
console.log(countSigFigs("12"));         // 2
console.log(countSigFigs("12.0"));       // 3
console.log(countSigFigs("0.0046"));     // 2
console.log(countSigFigs("100"));        // 3
console.log(countSigFigs("0.500"));      // 3
console.log(countSigFigs("1.0000"));     // 5
