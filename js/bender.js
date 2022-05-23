function create_robot(){
  let bender = document.createElement('img');
  bender.id = 'bender';
  bender.src = "../img/Bender.png";
  bender.style.height = "100px";
  bender.style.position = "absolute";
  bender.style.top = "0px";
  bender.style.left = "0px";
  bender.style.transition = "all 2s";
  bender.id = "bender";
  document.body.append(bender);
}

function move_bot_right() {
  let bender = document.getElementById('bender');
  bender.style.left = (parseInt(bender.style.left) + 100) + 'px';
}
function move_bot_left() {
  let bender = document.getElementById('bender');
  bender.style.left = (parseInt(bender.style.left) - 100) + 'px';
}
function move_bot_top() {
  let bender = document.getElementById('bender');
  bender.style.top = (parseInt(bender.style.top) - 100) + 'px';
}
function move_bot_bottom() {
  let bender = document.getElementById('bender');
  bender.style.top = (parseInt(bender.style.top) + 100) + 'px';
}
