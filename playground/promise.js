var promise = new Promise((resolve, reject) => {

    setTimeout( () => {
        //resolve("hye it worked");
        reject("this shit failed");
    }, 2000);


});
promise.then(
    (v) => {console.log("success", v)},
    (r) => {console.log("fail", r)}
);