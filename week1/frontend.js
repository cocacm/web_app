var people=[
  'jerry',
  'person',
  'memes',
  'dude',
  'bro',
  'vape',
  'spongebob',
  'patrick',
  'morty',
  'rick',
  '2017',
  'lit af'
]
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
];
var elementAttributes = [
  'id',
  'value',
  'placeholder'
];
var elementEvents = [
  'click'
];

//creates and returns DOM elements
function Renderer(component, children, innerText, props){
 var elem;
 if(typeof component === 'string'){
     //component is html element
     elem = createChild(component, children, innerText);
 }else{
   if(component.render){
     elem = component.render();
   }else{
     elem = component
   }
 }
 for(var key in props){
   console.log(key);
 }
 return elem
}

function createChild(component, children, innerText){
 console.log(children);
 var elem = document.createElement(component);
 if(children){
   children.forEach(child => {
     elem.appendChild(Renderer(child, null, null))
   })
 }else{
   var text = document.createTextNode(innerText);
   elem.appendChild(text);
 }
 return elem;
}

function randomInt(min, max){
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min) + min);
}

//appends root component to DOM
function RootComponent(component, parent){
  this.component=component;
  this.parent=parent;
  this.render();
}

RootComponent.prototype.render = function(){
  console.log(this.component);
  if(typeof this.component === 'string'){
    var child = document.createElement(this.component);
    this.parent.appendChild(child)
  }else{
    if(this.component.render){
      //component is object
      this.parent.appendChild(Renderer(this.component.render()));
    }else{
      //component is html node
      this.parent.appendChild(this.component)
    }
  }
}

//components extend this class
function Component(props){
  this.props = props;
  this.state  = this.props;
}

Component.prototype.setState = function(newState){
  //item was deleted, remove corresponding DOM nodes
  if(newState.length < this.state.length){
    this.state.forEach( (item, index) => {
      if(newState.indexOf(item) < 0){
        this.parent.removeChild(this.parent.children[index]);
      }
    })
  }
  //assign new items and re-render
  this.state = newState;
  this.render()
}

//this class creates a span element with text in it
function Text(props){
  Component.call(this, props);
  this.randomness = this.randomness.bind(this);
}

Text.prototype.render = function(){
  this.elem = Renderer('span', null, this.props.text, null);
  setInterval(this.randomness, 200);
  return this.elem;
}

Text.prototype.randomness = function(){
  this.elem.style.backgroundColor=colors[randomInt(0, colors.length)]
  this.elem.style.left=randomInt(-40, 40)+'px';
  this.elem.style.padding=randomInt(2, 15)+'px';
  this.elem.style.boxShadow=(randomInt(0, 2) ? '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.2)' : '')
}


function Container(props){
  Component.call(this, props);
  this.removeItem = this.removeItem.bind(this);
  this.addPerson = this.addPerson.bind(this);
}

Container.prototype.render = function(){
  return Renderer('div', this.props.people.map(person => {return new Text({text:person})} ), null)
}

Container.prototype.removeItem = function(event){
  //need to implement event support in Renderer
  var index = Array.prototype.indexOf.call(this.parent.children, event.target);
  //create a copy of the array and modify that, avoid modifying state directly
  var newPeople = this.items.map( item => { return item });
  newPeople.splice(index, 1)
  this.setState(newPeople)
}
Container.prototype.addPerson = function(){
  //convert this to a class method and implement event support in Renderer
  var input = document.getElementById('add-person');
  var person = input.value;
  //do something here...

  input.value="";
}

window.onload = function(){
  var root = new RootComponent(new Container({people: people}), document.body)
}
