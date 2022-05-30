var newCommandForm = document.forms.newTaskF; 


function ajouter(){
    // Vérifier que la récupération se fait bien !)
    console.log(document.forms.newTaskF.tache.value);
    console.log(document.forms.newTaskF.date.value);

    let tache = tacheSaisie();
    pushTache(tache);
    
    addAllTasksToTable(mesTaches)    
}

function addAllTasksToTable(tasks) {
  tasks.forEach(function addToTable(tache) {
    if (tache.addToTable) {
      return;
    }

    // Création des variable pour la création d'une nouvelle ligne dans le tableau
    const newItem = document.createElement('tr')
    const taskTd = document.createElement('td')
    const dateTd = document.createElement('td')
    const categorieTd = document.createElement('td')
    const addAtTd = document.createElement('td')
    const lengthTd = document.createElement('td')
    const buttonTd = document.createElement('td')
    const finishAtTd = document.createElement('td')

    taskTd.textContent = tache.nom
    dateTd.textContent = tache.date
    categorieTd.textContent = tache.categorie
    addAtTd.textContent = tache.addAt
    lengthTd.className = 'duree'
    lengthTd.textContent = tache.length
    
    const button = document.createElement('button')
    button.textContent = "Terminer la tâche"
    button.addEventListener("click", function f() {
      button.textContent = "Terminé !"
      finishAtTd.textContent = debut_fin_tache();
    });
    buttonTd.appendChild(button);

    //const selectEntree = document.getElementById("entreeId");
    //const valeurselectionnee = selectEntree.options[selectEntree.selectedIndex].value;
    //const textselectionne = selectEntree.options[selectEntree.selectedIndex].text;
    
    //Vérification de la récupération
    tache.log_tache()
    
    //const table = document.querySelector('table')
    newItem.append(taskTd, dateTd, categorieTd, addAtTd, lengthTd, finishAtTd, buttonTd)

    /* On ajoute chaque élément dans mesTaches au tableau */

    /* le premier élément dans le document qui contient la classe "datatable" est retourné*/
    const table = document.querySelector('.datatable tbody')
    /*  Ex2)3)vi) */
    table.appendChild(newItem)

    tache.addToTable = true;

    if (taskTd.textContent == "BOT_RUN") {
      activate_bot()
    }
  });
}

//supprimer toutes les lignes du tableau
function supprimer() {
  const tbody = document.querySelector('.datatable tbody' )
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  } 
}

function debut_fin_tache() {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let hour = d.getHours();
  let minute = d.getMinutes();
  let second = d.getSeconds();

  return year + '-' + month + '-' + day + ' à ' + hour + ':' + minute + ':' + second;
}

function incrementerDuree() {
  let durees = document.getElementsByClassName("duree")
  if (durees.length != 0) {
    Array.prototype.forEach.call(durees, function(dureeElement) {
      let valeur = parseInt(dureeElement.textContent)
      dureeElement.textContent = valeur + 1
    });
  }
}
class Tache {
  constructor(nom, date, categorie) {
    this.nom = nom;
    this.date = date;
    this.categorie = categorie;
    this.addAt = debut_fin_tache();
    this.length = 0;
    this.addToTable = false;
  }

  log_tache() {
    console.log(this.nom)
    console.log(this.date)
    console.log(this.categorie)
    console.log(this.addAt)
    console.log(this.length)
  }
}

/*
function tacheSaisie() {
  return {
    nom: document.forms.newTaskF.tache.value,
    date: document.forms.newTaskF.date.value,
    categorie: document.forms.newTaskF.categorie.value
  }
}
*/

var mesTaches = []

function pushTache(unetache) {
  mesTaches.push(unetache);
}

function tacheSaisie() {
  var newCommandForm = document.forms.newTaskF;
  if (!newCommandForm.tache.checkValidity() ||
    !newCommandForm.date.checkValidity() ||
    !newCommandForm.categorie.checkValidity()
    ) {
    return
  }
  return new Tache(
    newCommandForm.tache.value,
    newCommandForm.date.value,
    newCommandForm.categorie.value
  );
}

function reformatDate(date_str) {
  d = new Date(date_str)
  let day = String(d.getDate()).padStart(2, '0');
  let month = String(d.getMonth() + 1).padStart(2, '0');
  let year = d.getFullYear();

  return year + '-' + day + '-' + month;
}

function reformatBackDate(date_str) {
  d = new Date(date_str)
  let day = String(d.getDate()).padStart(2, '0');
  let month = String(d.getMonth() + 1).padStart(2, '0');
  let year = d.getFullYear() % 100;

  return day + '/' + month + '/' + year;
}

function loadTasks(url) {
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json();
  }).then(tasks => {
    console.log(tasks)
    tasks.forEach((tache) => {pushTache(new Tache(tache['task'], reformatDate(tache['date']), tache['category']))})
    addAllTasksToTable(mesTaches)
  }).catch(err => {
    console.error(err)
  });
}

function getTasksFromTableToJSON() {
  tasks = []
  let table = document.querySelector('.datatable tbody')
  let rows = table.getElementsByTagName('tr')

  for (let index = 0; index < rows.length; index++) {
    cells = [...rows[index].getElementsByTagName('td')]
    tasks.push({
      "task": cells[0].outerText,
      "date": reformatBackDate(cells[1].outerText),
      "category": cells[2].outerText,
    })
  }

  json = JSON.stringify(tasks);
  console.log(json)
  return json
}

// Background jobs and at run script
setInterval(incrementerDuree, 1000);
loadTasks('/tasks.json');
