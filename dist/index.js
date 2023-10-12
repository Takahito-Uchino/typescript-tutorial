"use strict";
let reserve = (fromOrDestination, toOrDestination, destination) => {
    if (fromOrDestination instanceof Date &&
        toOrDestination instanceof Date &&
        destination !== undefined) {
        console.log("宿泊旅行を予約する");
    }
    else if (fromOrDestination instanceof Date &&
        typeof toOrDestination === "string") {
        console.log("日帰り旅行を予約する");
    }
    else if (typeof fromOrDestination === "string") {
        console.log("すぐに出発する旅行を予約する");
    }
};
function call(f, ...args) {
    return f(...args);
}
function fill(length, value) {
    return Array.from({ length }, () => value);
}
call(fill, 10, "a");
function is(a, ...b) {
    return b.every(_ => _ === a);
}
is("string", "otherstring");
is(true, false);
is(42, 42);
is(10, "foo");
is([1], [1, 2], [1, 2, 3]);
//# sourceMappingURL=index.js.map