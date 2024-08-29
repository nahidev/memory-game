const container = document.getElementById("container");
const rowSize = 4 
let numCards = rowSize*rowSize;
let row;
let cardOne = null;
let cardTwo = null;
let cardCouples = 0;
const numPairs = numCards / 2;

let cardsNamesAndAmmounts = [
    {name: 'imgs/sushi.png', ammount: 2}, 
    {name: 'imgs/gato.png', ammount: 2},
    {name: 'imgs/rana.png', ammount: 2},
    {name: 'imgs/aguacate.png', ammount: 2}, 
    {name: 'imgs/cangrejo.png', ammount: 2},
    {name: 'imgs/naranja.png', ammount: 2},
    {name: 'imgs/serpiente.png', ammount: 2},
    {name: 'imgs/tarta.png', ammount: 2}
];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function createFrontFace(){

    let position = getRandomInt(numPairs);
    let randomCard = cardsNamesAndAmmounts[position];
    let ammount = cardsNamesAndAmmounts[position].ammount;

    while (ammount === 0){
        position = getRandomInt(numPairs);
        randomCard = cardsNamesAndAmmounts[position];
        ammount = cardsNamesAndAmmounts[position].ammount;
    }

    cardsNamesAndAmmounts[position].ammount -= 1;

    console.log(randomCard);
    return randomCard.name;
}

function createBoard(){
    for(let i = 0; i < numCards; i++){
        if (i % rowSize === 0) { 
            //Crea fila
            row = document.createElement("div");
            row.classList.add("rowDiv");
            container.appendChild(row);
        }
        // Crea carta
        let card = document.createElement("div");
        card.classList.add("card");
        row.appendChild(card);

        // Crea inner
        let inner = document.createElement("div");
        inner.classList.add("inner");
        card.appendChild(inner);
        
        // Crea front-face
        let imgTagFrontFace = document.createElement("img");
        imgTagFrontFace.classList.add("front-face");
        imgTagFrontFace.src = createFrontFace();
        imgTagFrontFace.alt = "Imagen de la carta";
        inner.appendChild(imgTagFrontFace);

        // Crea back-face
        let imgTagBackFace = document.createElement("img");
        imgTagBackFace.classList.add("back-face");
        imgTagBackFace.src = "imgs/ovni.png";
        imgTagBackFace.alt = "Imagen trasera";
        inner.appendChild(imgTagBackFace);
        

    };
};
createBoard();

let cards = document.querySelectorAll(".card");

congratsMessage.style.display = "none";
cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
    this.classList.toggle("flipped");

    if (cardOne === null) { 
     cardOne = this;
     return;
    }
 
    cardTwo = this;
    checkMatch();
}

function checkMatch(){
    
    let cardOneImg = cardOne.querySelector(".front-face").src
    let cardTwoImg = cardTwo.querySelector(".front-face").src
    if(cardOneImg === cardTwoImg){
       console.log("son iguales");
       cardCouples++;
       lockCards();
       resetCards();
       checkGameOver();
    }else{
       console.log("no son iguales :( jolines macho");
       flipBack()
    }
 }

 function resetCards(){
    cardOne = null;
    cardTwo = null;
}

function lockCards(){
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
 }

 function checkGameOver(){
    if(cardCouples === numPairs){
       setTimeout(() => {
          congratsMessage.style.display = "flex"; 
      }, 500);
    }
 }
 function flipBack(){
    setTimeout(() => {
       cardOne.classList.remove("flipped");
       cardTwo.classList.remove("flipped");
       resetCards();
    }, "1000");
 }
 
 function deleteBoard(){
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
 }

 function resetGame(){
    deleteBoard();
    resetCards();
    cardCouples = 0;
    cardsNamesAndAmmounts.forEach(card => {
        card.ammount = 2;
    });
    createBoard();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", flipCard);
    });
    congratsMessage.style.display = "none"; 
 
 }
 restartButton.addEventListener("click", resetGame); 