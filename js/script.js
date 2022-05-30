var newCommandForm = document.forms.newTaskF; 


function ajouter(){
    //Vérifier que la récupération se fait bien !)
    console.log(document.forms.newTaskF.tache.value);
    console.log(document.forms.newTaskF.date.value);

    //création des variable pour la création d'une nouvelle ligne dans le tableau
    const newItem = document.createElement('tr')
    const taskTd = document.createElement('td')
    const dateTd = document.createElement('td')
    const categorieTd = document.createElement('td')
    const addAtTd = document.createElement('td')
    const lengthTd = document.createElement('td')
    const buttonTd = document.createElement('td')
    const finishAtTd = document.createElement('td')

    taskTd.textContent = document.newTaskF.tache.value
    dateTd.textContent = document.newTaskF.date.value
    categorieTd.textContent = document.newTaskF.categorie.value
    addAtTd.textContent = debut_fin_tache()
    lengthTd.className = 'duree';
    lengthTd.textContent = '0';
    
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
    console.log(taskTd.textContent)
    console.log(dateTd.textContent)
    console.log(categorieTd.textContent)
    console.log(addAtTd.textContent)
    console.log(lengthTd.textContent)

    if (!document.newTaskF.tache.checkValidity() ||
          !document.newTaskF.date.checkValidity() ||
          !document.newTaskF.categorie.checkValidity()
         ) {
          return
        }
    
    //const table = document.querySelector('table')
    newItem.append(taskTd, dateTd, categorieTd, addAtTd, lengthTd, finishAtTd, buttonTd)

    /* le premier élément dans le document qui contient la classe "datatable" est retourné*/
    const table = document.querySelector('.datatable tbody')
    /*  Ex2)3)vi) */
    table.appendChild(newItem)

    if (taskTd.textContent == "BOT_RUN") {
      activate_bot()
    }
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
  return new Tache(newCommandForm.tache.value, newCommandForm.date.value, newCommandForm.categorie.value);
}

// Background jobs
setInterval(incrementerDuree, 1000);