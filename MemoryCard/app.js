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
    let Fruits = ["apple", "apple", "banana", "banana", "straw", "straw", "cherry", "cherry", "brocoli", "brocoli", "pepper", "pepper"];
    window.addEventListener('load', () => {


        for (let i = 0; i < 12; i++) {
            let fruit = Fruits[Math.floor(Math.random() * Fruits.length)];
            let index = Fruits.indexOf(fruit);
            Fruits.splice(index, 1);
            fruit = fruit.replace(/['"]+/g, '')




            grid.innerHTML += `  
<div class = "carte" data-attr="${fruit}">
    <div class = "double-face">
    <div class = "face">
    <img src = "ressources/${fruit}.svg"></div> 
    <div class = "arriere" >
</div>`
            cards.push(fruit);
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
    }

    async function notMatch(card1, card2) {
        // Retourne les cartes après 3 secondes
        setTimeout(() => {
            card1.classList.toggle("active");
            card2.classList.toggle("active");
        }, 1000);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    startTimer(true);
    generateGrid();
    play();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnRestart')) {
        location.reload();
    }
});