function activate_bot() {
  alert("BOT GO! ")
  let table = document.querySelector('.datatable tbody')
  let cells = [...table.getElementsByTagName('tr')]
  const tasks_name = cells.map(row => row.cells[0]);

  if (tasks_name != 0) {
    for (let index = 0; index < tasks_name.length; index++) {
      const cell = tasks_name[index];
      setTimeout(() => {get_bot_action(cell.textContent)();}, index*1000)
    }
  }
}
function get_bot_action(textContent) {
  console.log(textContent)
  switch (textContent) {
    case "BOT_CREATE":
      return function create_robot(){
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
      };
    
    case "BOT_RIGHT":
      return function move_bot_right() {
        let bender = document.getElementById('bender');
        bender.style.left = (parseInt(bender.style.left) + 100) + 'px';
      };
    
    case "BOT_LEFT":
      return function move_bot_left() {
        let bender = document.getElementById('bender');
        bender.style.left = (parseInt(bender.style.left) - 100) + 'px';
      };
    
    case "BOT_UP":
      return function move_bot_top() {
        let bender = document.getElementById('bender');
        bender.style.top = (parseInt(bender.style.top) - 100) + 'px';
      };
    
    case "BOT_DOWN":
      return function move_bot_bottom() {
        let bender = document.getElementById('bender');
        bender.style.top = (parseInt(bender.style.top) + 100) + 'px';
      };
    
    default:
      break;
  }
}