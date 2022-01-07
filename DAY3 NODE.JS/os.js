const appMemory = require("os");
const totMem = appMemory.totalmem();
const freeMem = appMemory.freemem();

// ES6

console.log(`Total memory: ${totMem}`);
console.log(`Free memory: ${freeMem}`);
