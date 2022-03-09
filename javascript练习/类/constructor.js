function A() {
  this.s = "ss";
  console.log("constructor");
  return this.s;
}
A.prototype = {
  constructor: () => {
    console.log("xxx");
  },
};
var a = new A();
console.log(a.__proto__.constructor);
