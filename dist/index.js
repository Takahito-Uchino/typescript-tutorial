"use strict";
let a;
a = 1;
let b;
b = 2;
let c;
c = "foo";
let d;
d = true;
let e;
e = [1];
let f;
f = [1];
let g;
g = { a: true };
let h;
h = { a: { b: ["c"] } };
let i;
i = ((b) => "c");
let k;
k = ((a) => "b");
var E;
(function (E) {
    E["X"] = "X";
})(E || (E = {}));
var F;
(function (F) {
    F["X"] = "X";
})(F || (F = {}));
let l;
l = E.X;
const globalCache = {
    get(key) {
        return "user";
    }
};
const userId = fetchUser();
userId.toUpperCase();
function fetchUser() {
    return globalCache.get("userId");
}
//# sourceMappingURL=index.js.map