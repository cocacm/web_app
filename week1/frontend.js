var people=[
  'justin',
  'rob',
  'spongebob',
  'patrick',
  'morty',
  'rick'
];
var colors=[
  'red',
  'blue',
  'green',
  'orange',
  'yellow',
  'cyan',
  'magenta',
  'purple',
  'teal'
]
//change to switch between class and function examples
var useClassExample = true;

/*  the following code is a good example of when and when not to use a 'class' in javascript.
The class example requires six methods while the pure function requires 4.
Although the class example could be re used to work with any kind of element */

//CLASS EXAMPLE

// constructor function
function Renderer(childType, items, onClick){
  this.parent;
  this.childType = childType;
  this.items = items;
  this.onClick = onClick;

  //bind click handler and timeout function to instance scope
  this.onClick = this.onClick.bind(this);
  this.randomness = this.randomness.bind(this);
}

//class methods
Renderer.prototype.renderListItems = function(){
  var child, childNodes, item;
  childNodes = this.parent.childNodes;
  //handle added or modified items
  for(var i = 0; i < this.items.length; i++){
    child = childNodes[i];
    item = this.items[i];
    if(!child){
      //item was added
      this.createListItem(item)
    }else if(item != child.innerText){
      //item was changed
      child.textContent = item
    }
  }
}

Renderer.prototype.createListItem = function(name){
  var child = document.createElement(this.childType);
  var text = document.createTextNode(name);
  this.parent.appendChild(child);
  child.appendChild(text);
  child.addEventListener('click', this.onClick)
  child.setAttribute('title', 'click to remove');
}

Renderer.prototype.setItems = function(newItems){
  //item was deleted, remove corresponding DOM node
  if(newItems.length < this.items.length){
    var deleted=[];
    this.items.forEach( (item, index) => {
      //store index of each deleted item
      if(!newItems[index]){
        deleted.push(index);
      }
    })
    //loop through deleted items and remove DOM node
    deleted.forEach( index => {
      this.parent.removeChild(this.parent.children[index]);
    })
  }
  //assign new items and re-render
  this.items = newItems;
  this.renderListItems()
}

Renderer.prototype.randomness = function(){
  var items = document.getElementsByTagName(this.childType);
  var item = randomInt(0, this.items.length)
  items[item].style.color=colors[randomInt(0, colors.length)]
  items[item].style.left=randomInt(-40, 40)+'px';
  items[item].style.marginBottom=randomInt(5, 20)+'px';
}

Renderer.prototype.start = function(parentNode){
  this.parent = parentNode;
  this.renderListItems();
  setInterval(this.randomness, 200)
}
// end class methods
// END CLASS EXAMPLE

// PURE FUNCTION EXAMPLE
function start(){
  renderListItems();
  setInterval(function(){
    var items = document.getElementsByTagName('li');
    var item = randomInt(0, people.length)
    items[item].style.color=colors[randomInt(0, colors.length)]
    items[item].style.left=randomInt(-40, 40)+'px';
    items[item].style.marginBottom=randomInt(5, 20)+'px';
  }, 200)
}

function renderListItems(){
  var ul = document.getElementById('list');
  var child, childNodes, person;
  childNodes = ul.childNodes;
  for(var i = 0; i < people.length; i++){
    child = childNodes[i];
    person = people[i];
    if(!child){
      createListItem(ul, person)
    }else if(person != child.innerText){
      child.textContent = person
    }
  }
}

function createListItem(element, name){
  var li = document.createElement('li');
  var text = document.createTextNode(name);
  element.appendChild(li);
  li.appendChild(text);
  li.addEventListener('click', removeListItem)
  li.setAttribute('title', 'click to remove');
}
// END PURE FUNCTION EXAMPLE

// utility function, returns a random int between min and max
function randomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// EVENT HANDLERS
function removeListItem(event){
  if(useClassExample){
    var index = Array.prototype.indexOf.call(renderer.parent.children, event.target);
    //create a copy of the array and modify that, avoid modifying state directly
    var newPeople = renderer.items.map( item => { return item });
    newPeople.splice(index, 1)
    renderer.setItems(newPeople)
  }else{
    var ul = document.getElementById('list');
    var index = Array.prototype.indexOf.call(ul.children, event.target);
    people.splice(index, 1)
    ul.removeChild(event.target);
  }
}

function addPerson(){
  if(useClassExample){
    var input = document.getElementById('add-person')
    var person = input.value;
    var people = renderer.items
    people.push(person);
    input.value="";
    renderer.setItems(people);
  }else{
    var input = document.getElementById('add-person')
    var person = input.value;
    people.push(person);
    input.value="";
    renderListItems();
  }
}
// END EVENT HANDLERS

var renderer = new Renderer('li', people, removeListItem)
window.onload = function(){
  if(useClassExample){
    //parent element needs to be provided after DOM has been created
    renderer.start(document.getElementById('list'))
  }else{
    start()
  }
}
