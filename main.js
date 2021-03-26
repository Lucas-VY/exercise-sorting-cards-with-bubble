/* selecciona y transforma en variable */
let number = document.querySelector('#number');
let btnDraw = document.querySelector('#draw');
let btnSort = document.querySelector('#sort');

/* variables y sus valores */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let suits = ['♦', '♥', '♠', '♣'];
/* almacenador */
let orderCards = [];

/* inversor de valores de cartas A, J, Q, K */
function changeValue(valor) {
    switch (valor) {
        case 1: return "A";
        case 11: return "J";
        case 12: return "Q";
        case 13: return "K";
        default: return valor;
    }
}

/* creador de cartas */
function createCards(elem) {
    let input = document.getElementById('amountOfCards');
    let amountOfCards = parseInt(input.value); //pido valor entero 
    orderCards = [];
    
    /* Estructura de carta */
    for (let i = 0; i < amountOfCards; i++) {
        let randomNumber = Math.floor(Math.random() * numbers.length);
        let randomSuit = Math.floor(Math.random() * suits.length);
        
        /* Div-class-card */
        let card = document.createElement('div');
        card.classList.add('card');

        /* parte superior carta */
        //div class topSuit
        let topSuit = document.createElement('div');
        topSuit.classList.add('topSuit');
        topSuit.innerHTML = suits[randomSuit];
        
        /* parte media carta */
        //div class middleNumber
        let middleNumber = document.createElement('div');
        middleNumber.classList.add('middleNumber');
        middleNumber.innerHTML = numbers[randomNumber];

        /* parte baja carta */
        //div clase bottonSuit
        let bottonSuit = document.createElement('div');
        bottonSuit.classList.add('bottonSuit');

        /* aignacion de colores carta */
        if (topSuit.innerHTML === '♥' || topSuit.innerHTML === '♦') {
            topSuit.style.color = "red";
            middleNumber.style.color = "red"
            bottonSuit.style.color = "red";
        } else {
            topSuit.style.color = "black";
            middleNumber.style.color = "black"
            bottonSuit.style.color = "black";
        };

        /* añade la estructura de la carta en orden en el html */
        bottonSuit.innerHTML = topSuit.innerHTML;

        card.appendChild(topSuit);
        card.appendChild(middleNumber);
        card.appendChild(bottonSuit);
        elem.appendChild(card);
        
        /* cuando cambia de valor el numero cambia a numero entero */
        let cardContent = {
            number: parseInt(changeValue(middleNumber.innerHTML)),
            html: card.innerHTML
        }
        /* almacena carta con push en el array */
        orderCards.push(cardContent);
    }
}

/* DRAW button estructura*/
btnDraw.addEventListener('click', (e) => {
    const cardDeck = document.querySelector('#cardDeck');
    cardDeck.innerHTML = "";
    createCards(cardDeck);

    let sortDeck = document.getElementById('sortDeck');
    sortDeck.innerHTML = "";
});

/* Sort button estructura*/
/* btnSort.addEventListener('click' (e) => {
    let sortDeck = document.getElementById('sortDeck');
    sortDeck.innerHTML = ""; */

    /* bubble sort loop */
    /* for (let j = orderCards.length - 1; j > 0; j++) {
        for (let k = 0; k < j; k++) {
            if (orderCards[k].number > orderCards[k+1].number){
                let aux = orderCards[k];

              }
             }
         }
    }

}); */


let sortArray = (arr) => {
    let wall = arr.length - 1;
    let numberOfTry = 0;
    while (wall > 0) {
        let index = 0;

        while (index < wall) {

            let log = document.createElement("p");
            log.innerHTML = numberOfTry;
            sortDeck.appendChild(log)
            for (let j = 0; j < arr.length; j++) {
                createCard(arr[j], sortDeck)

            }

            if (arr[index].number > arr[index + 1].number) {
                let aux = arr[index].number;
                arr[index].number = arr[index + 1].number;
                arr[index + 1].number = aux;
            }

            index++
            numberOfTry++
        }

        wall--;
    }
    return arr
}

let sortCards = () => {
    let newCardSet = sortArray(cardsToSort);

    if (newCardSet.length > 0) {

        let cardTotal = document.querySelectorAll("#cardDeck > .card");
        cardTotal.forEach(el => {
            el.remove()
        })

        for (let i = 0; i < newCardSet.length; i++) {
            createCard(newCardSet[i], cardDeck);
        }



    } else {
        alert("No hay cartas para ordenar. Por favor presiona el boton de repartir")
    }

} 