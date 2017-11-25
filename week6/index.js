function Person(first, last, age) {
  this.first = first;
  this.last = last;
  this.age = age;
  this.clicked = 0;
}

Person.prototype.sayName = function() {
  console.log(this.name + ' ' + this.last);
  return this.first + ' ' + this.last
}

Person.prototype.sayAge = function() {
  if (this.age >= 40)
    console.log('midlife crisis');
  else
    console.log('age is ' + this.age)
}

var dude = new Person('sup', 'bro', 30);

dude.sayName()
dude.sayAge()

var count = 1;
function createShit() {
var div = document.createElement('div');
var text = document.createTextNode(dude.sayName());
div.appendChild(text);
div.style.width="300px";
div.style.height="200px";
div.style.fontSize="18px";
div.style.color="white";
div.style.background="orange";
document.body.appendChild(div);

}
