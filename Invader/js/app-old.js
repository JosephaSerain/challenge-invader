// On va d'abord récupérer la grille
// soit l'élément dont l'id est #invader
const gameboard = document.getElementById("invader");

// Récupérez moi, le formulaire .configuration
const configForm = document.querySelector(".configuration");

// Je souhaite créer une fonction pour créer un champ <input>
// de formulaire qui va contenir les attributs suivants :
function createFormInput(type, placeholder, id, name, minValue = 1) {
  const input = document.createElement("input");
  // - un type number
  input.type = type;
  // - placeholder
  input.placeholder = placeholder;
  // - id
  input.id = id;
  // - name
  input.name = name;
  // - une valeur minimale
  input.setAttribute("min", minValue);

  // Je finis par ajouter ce champ en enfant de configForm
  configForm.appendChild(input);
}

// Même chose, je vais créer une fonction pour créer un bouton
// sur mon formulaire
function createFormButton() {
  const button = document.createElement("button");
  button.textContent = "Valider";
  button.type = "submit";
  configForm.appendChild(button);
}

createFormInput("number", "Taille de la grille", "grid-size", "grid-size");
createFormButton();

// Je vais créer une fonction permettant de
// générer le plateau de jeu
function createGameboard(gridSize = 8) {
  // Vous allez créer une boucle qui va me permettre
  // de créer les différentes lignes de mon plateau de jeu
  for (let line = 0; line < gridSize; line++) {
    // On crée un nouvel élément <div>
    const newLine = document.createElement("div");
    // On lui ajoute la classe .line
    newLine.className = "line";

    // Je souhaite créer une nouvelle boucle qui
    // va ajouter chaque pixel à intégrer
    for (let pixel = 0; pixel < gridSize; pixel++) {
      // Pour rappel, un pixel est une <div> de classe .pixel
      // et surtout chaque pixel de base contient la classe
      // .pixel--empty
      const newPixel = document.createElement("div");
      newPixel.className = "pixel pixel--empty";

      // * Etape 2 - Je souhaite ajouter un écouteur d'événement
      // Cet écouteur va être apposé sur le "newPixel"
      // Il va écouter l'action "click"
      newPixel.addEventListener("click", function () {
        // Manière verbeuse (ça marche mais c'est touffu)
        // if (newPixel.classList.contains("pixel--empty")) {
        //   newPixel.classList.remove("pixel--empty");
        //   newPixel.classList.add("pixel--plain");
        // } else if (newPixel.classList.contains("pixel--plain")) {
        //   newPixel.classList.remove("pixel--plain");
        //   newPixel.classList.add("pixel--empty");
        // }

        // Manière plus concise pour le même résultat
        newPixel.classList.toggle("pixel--empty");
        newPixel.classList.toggle("pixel--plain");
      });
      // Et il va vérifier si le pixel contient la classe "pixel--empty"
      // Si c'est le cas : on efface la classe "pixel--empty"
      // et on ajoute la classe "pixel--plain"
      // Si la classe "pixel--plain" est présente, on la retire
      // pour mettre à la place la classe "pixel--empty"

      // Je finis par ajouter le nouveau pixel créé dans
      // la ligne correspondante
      newLine.appendChild(newPixel);
    }

    // On ajoute cet élément en enfant de gameBoard
    gameboard.appendChild(newLine);
  }
}

// Je finis par appeler ma fonction de création
// de plateau de jeu
// Si j'appelle cette fonction sans propriété
// Je crée une grille de 8 x 8 pixels
createGameboard();

// Nous allons créer un écouteur d'événement
// qui va venir se positionner sur notre formulaire (configForm)
// L'action à écouter est : "submit"
// Pour récupérer l'événement et savoir ce qu'il s'y passe
// Récupérer "event" en argument de la fonction de rappel de l'écouteur
// et regardez ce qu'il se passe via un console.log(event)
configForm.addEventListener("submit", function (event) {
  // On souhaite retirer le comportement par défaut
  // de soumission de notre formulaire
  //  MDN : https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
  event.preventDefault();

  // Je récupère la valeur de la cible de l'événement. Ici, j'ai
  // donc en sortie un tableau composé de plusieurs éléments
  // HTML. Le premier élément (index 0) est mon champ
  // <input id="grid-size">
  console.log(event.target[0].value);

  // Je souhaite avant de générer une nouvelle grille
  // de supprimer celle actuellement présente
  gameboard.textContent = "";

  // Je souhaite appeler ma fonction createGameboard
  // avec en argument la valeur de la cible de l'événement
  createGameboard(event.target[0].value);
});