var hello = function() {
  fetch('/hello')
  .then(res => { return res.json()})
  .then(function(data) {
    console.log(data);
    alert(data.data);
    document.getElementById('example').style.backgroundColor="orange";
  })
}
