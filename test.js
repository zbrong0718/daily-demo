var Person = (function() {
  var a = 1;
  function Person() {}
  Person.prototype.getA = function() {
    return a;
  };

  Person.prototype.setA = function(v) {
    a = v;
    this.a = a;
  };
  return Person;
})();

var person = new Person();
person.setA(5);
var person1 = new Person();
console.log( person1.getA() );