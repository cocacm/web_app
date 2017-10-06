var people=[
  {name:'justin'},
  {name:'rob'},
  {name:'spongebob'},
  {name:'patrick'},
  {name:'morty'},
  {name:'rick'}
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

function init(){
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
      createListItem(ul, person.name)
    }else if(person.name != child.innerText){
      child.textContent = person.name
    }
  }
}

function randomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function createListItem(element, name){
  var li = document.createElement('li');
  var text = document.createTextNode(name);
  element.appendChild(li);
  li.appendChild(text);
  li.addEventListener('click', removeListItem)
  li.setAttribute('title', 'click to remove');
}

function removeListItem(event){
  var ul = document.getElementById('list');
  var index = Array.prototype.indexOf.call(ul.children, event.target);
  people.splice(index, 1)
  ul.removeChild(event.target);
}

function addPerson(){
  var input = document.getElementById('add-person')
  var person = input.value;
  people.push({name:person});
  input.value="";
  renderListItems();
}

window.onload = init;
