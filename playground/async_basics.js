console.log("starting up");
setTimeout(() => {
    console.log("Inside of callback");
}, 2000);
setTimeout(() => {
    console.log("Second callback");
}, 0);
console.log("finsh up");
