"use strict";
class BalletFlat {
    constructor() {
        this.purpose = "dancing";
    }
}
class Boot {
    constructor() {
        this.purpose = "woodcutting";
    }
}
class Sneaker {
    constructor() {
        this.purpose = "walking";
    }
}
let Shoe = {
    create(type) {
        switch (type) {
            case "balletFlat":
                return new BalletFlat();
            case "boot":
                return new Boot();
            case "sneaker":
                return new Sneaker();
        }
    }
};
Shoe.create("balletFlat");
Shoe.create("boot");
Shoe.create("sneaker");
class RequestBuilder {
    constructor() {
        this.data = null;
        this.method = null;
        this.url = null;
    }
    setMethod(method) {
        return new RequestBuilderWithMethod().setMethod(method).setData(this.data);
    }
    setData(data) {
        this.data = data;
        return this;
    }
}
class RequestBuilderWithMethod extends RequestBuilder {
    setMethod(method) {
        this.method = method;
        return this;
    }
    setURL(url) {
        return new RequestBuilderWithMethodAndURL()
            .setMethod(this.method)
            .setURL(url)
            .setData(this.data);
    }
}
class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
    setURL(url) {
        this.url = url;
        return this;
    }
    send() {
        console.log("送信");
    }
}
new RequestBuilder()
    .setMethod("get")
    .setData({})
    .setURL("foo.com")
    .send();
class RequestBuilder2 {
    setData(data) {
        return Object.assign(this, { data });
    }
    setMethod(method) {
        return Object.assign(this, { method });
    }
    setURL(url) {
        return Object.assign(this, { url });
    }
    build() {
        return this;
    }
}
new RequestBuilder2()
    .setData({})
    .setMethod("post")
    .setURL("bar")
    .build();
//# sourceMappingURL=index.js.map