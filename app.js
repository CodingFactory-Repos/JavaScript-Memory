let cards = [];


// function randomFruit() {
//     // Choisir un fruit au hasard
//     let fruit = Fruits[Math.floor(Math.random() * Fruits.length)];
//     let index = Fruits.indexOf(fruit);
//     Fruits.splice(index, 1);
//     fruit = fruit.replace(/['"]+/g, '')
//     console.log(Fruits);


//     return fruit;
// }




function startTimer(active) {
    if (active == true) {
        let end = false;
        if (!end) {
            let body = document.querySelector('body');
            let time = 0;
            let minutes = 0;
            let hours = 0;
            let timer = setInterval(() => {
                time++;
                document.querySelector('#timer').innerHTML = minutes + " : " + time;

                if (time > 59) {
                    minutes++;
                    time = 0;
                }

                if (hours <= 0 && minutes < 10 && time < 10) {
                    document.querySelector('#timer').innerHTML = "0" + minutes + " : 0" + time;
                } else if (hours <= 0 && minutes < 10 && time >= 10) {
                    document.querySelector('#timer').innerHTML = "0" + minutes + " : " + time;
                } else if (hours <= 0 && minutes > 10 && time < 10) {
                    document.querySelector('#timer').innerHTML = minutes + " : 0" + time;
                } else {
                    document.querySelector('#timer').innerHTML = minutes + " : " + time;
                }
                if (minutes > 59) {
                    hours++
                    minutes = 0;
                    time = 0
                }
                if (hours >= 1) {
                    document.querySelector('#timer').innerHTML = hours + " : " + minutes + " : " + time;
                }
            }, 1000);


            body.innerHTML += `
    <div id="timer">
    <p>${timer}</p>
    </div>`
        }
    } else {
        let body = document.querySelector('body');
        let timer = document.querySelector('#timer');
        body.removeChild(timer);
        end = true;
    }


}

function generateGrid() {





    let grid = document.querySelector('#grille')
    let Sushis = ["Sushi1", "Sushi1", "Sushi2", "Sushi2", "Sushi3", "Sushi3", "Sushi4", "Sushi4", "Sushi5", "Sushi5", "Sushi6", "Sushi6"]
    let Flowers = ["Flower1", "Flower1", "Flower2", "Flower2", "Flower3", "Flower3", "Flower4", "Flower4", "Flower5", "Flower5", "Flower6", "Flower6"]
    let Dogs = ["Dog1", "Dog1", "Dog2", "Dog2", "Dog3", "Dog3", "Dog4", "Dog4", "Dog5", "Dog5", "Dog6", "Dog6"]
    let Fruits = ["Fruits1", "Fruits1", "Fruits2", "Fruits2", "Fruits3", "Fruits3", "Fruits4", "Fruits4", "Fruits5", "Fruits5", "Fruits6", "Fruits6"];
    let Birds = ["Bird1", "Bird1", "Bird2", "Bird2", "Bird3", "Bird3", "Bird4", "Bird4", "Bird5", "Bird5", "Bird6", "Bird6"];
    let Cats = ["Cat1", "Cat1", "Cat2", "Cat2", "Cat3", "Cat3", "Cat4", "Cat4", "Cat5", "Cat5", "Cat6", "Cat6"];
    let Decks = [Fruits, Cats, Dogs, Flowers, Birds, Sushis];
    window.addEventListener('load', () => {


        let deck = Decks[Math.floor(Math.random() * Decks.length)]
        for (let i = 0; i < 12; i++) {
            let card = deck[Math.floor(Math.random() * deck.length)];
            let index = deck.indexOf(card);
            deck.splice(index, 1);
            card = card.replace(/['"]+/g, '')




            grid.innerHTML += `  
<div class = "carte" data-attr="${card}">
    <div class = "double-face">
    <div class = "face">
    <img src = "ressources/decks/${card}.png"></div> 
    <div class = "arriere" >
</div>`
            cards.push(card);
        }

    })

}
console.log(cards);




async function play() {

    let body = document.querySelector('body');
    console.log(cards);
    let cardFlipped = [];
    let cardFlippedSameTime = []
    let cardAttr = []
    let end = false;

    //console.log(toFlip)

    document.addEventListener('mouseover', (e) => {

        if (e.target.classList.contains('arriere')) {
            console.log('coucou')
            e.target.style.cursor = 'pointer';
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('arriere') && cardFlippedSameTime.length < 1) {
            console.log(cardFlippedSameTime.length);

            //console.log(e.target.classList)

            e.target.parentNode.parentNode.style.boxShadow = '0 0 0 0';

            flip(e.target.parentNode);

            cardFlipped.push(e.target.parentNode);
            cardFlippedSameTime.push(e.target.parentNode);
            cardAttr.push(e.target.parentNode.parentNode.getAttribute('data-attr'));
            //console.log(cardAttr);


            if (cardFlipped.length === 2 && (cardAttr[0] != cardAttr[1])) {
                //console.log(cardFlipped[0]);
                //console.log(cardFlipped[1]);
                notMatch(cardFlipped[0], cardFlipped[1]);
                cardFlipped = [];
                cardAttr = [];

            } else if (cardFlipped.length === 2 & cardAttr[0] === cardAttr[1]) {
                let Right = new Audio('ressources/Sound/Nice.mp3');
                Right.play();

                // console.log(cardFlipped[0].parentNode.getAttribute('data-attr'));
                // console.log(cardFlipped[1].parentNode.getAttribute('data-attr'));

                cards.splice(cards.indexOf(cardFlipped[0].parentNode.getAttribute('data-attr')), 1);
                cards.splice(cards.indexOf(cardFlipped[1].parentNode.getAttribute('data-attr')), 1);

                console.log(cards);
                cardFlipped = [];
                cardAttr = [];
            }

            setTimeout(() => {
                cardFlippedSameTime = [];
            }, 900);
        }

        setTimeout(() => {
            if (cards.length == 0 && !end) {



                body.innerHTML += `
                <div id="end">
                <div id="CONGRATS">
                <h1>Congrats !</h1>
                </div>
                <div>
                <p>You won in a time of ${document.querySelector('#timer').innerHTML}</p>
                </div>`

                startTimer(false);


                body.innerHTML += `  
            <button class="btnRestart">Restart a Game</button>`

                document.removeEventListener('click', play)
                end = true;
            }
        }, 1000);


    })


    // Retourner une carte 
    async function flip(card) {
        //retourne une carte
        card.classList.toggle("active");
        let flip = new Audio('ressources/Sound/Flip.mp3');
        flip.play();
    }

    async function notMatch(card1, card2) {
        // Retourne les cartes après 1 secondes
        setTimeout(() => {
            let Wrong = new Audio('ressources/Sound/Wrong.mp3');
            Wrong.play();
        }, 500);
        setTimeout(() => {
            card1.classList.toggle("active");
            card2.classList.toggle("active");

        }, 1000);
    }
}

async function returnEveryCard() {
    // return every card
    let cards = document.querySelectorAll('.double-face');
    cards.forEach(card => {
        card.classList.toggle("active");
    });
}


document.addEventListener("DOMContentLoaded", () => {
    startTimer(true);
    generateGrid();
    play();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnRestart')) {
        returnEveryCard();
        setTimeout(() => {
            location.reload();
        }, 500);
    }
});