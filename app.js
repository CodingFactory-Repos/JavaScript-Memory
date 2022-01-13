let cards = [];
let cardAlreadyDiscovered = [];



// function randomFruit() {
//     // Choisir un fruit au hasard
//     let fruit = Fruits[Math.floor(Math.random() * Fruits.length)];
//     let index = Fruits.indexOf(fruit);
//     Fruits.splice(index, 1);
//     fruit = fruit.replace(/['"]+/g, '')
//     console.log(Fruits);


//     return fruit;
// }

//** MAIN FUNCTIONS **/

//--------------------------------------------//

// Function to start a Timer

function startTimer(active) {

    // If active is true, start the timer
    if (active == true) {

        // Set the end of the timer to false

        let end = false;

        // If it's not the end
        if (!end) {

            // Set the timer to 0
            let body = document.querySelector('body');
            let seconds = 0;
            let minutes = 0;
            let hours = 0;

            // Increase the timer by 1 second every second
            let timer = setInterval(() => {
                seconds++;

                // Set the timer to the body
                document.querySelector('#timer').innerHTML = minutes + " : " + seconds;

                // If the seconds is equal to 60
                if (seconds > 59) {
                    // Increase the minute by 1
                    minutes++;
                    // Set the seconds to 0
                    seconds = 0;
                }

                // If the minutes are inferior to 10, and seconds inferior to 10, print a 0 before seconds and minutes
                if (hours == 0 && minutes < 10 && seconds < 10) {
                    document.querySelector('#timer').innerHTML = "0" + minutes + " : 0" + seconds;

                    // If the minutes are inferior to 10, and seconds superior to 10, print a 0 before minutes
                } else if (hours == 0 && minutes < 10 && seconds >= 10) {
                    document.querySelector('#timer').innerHTML = "0" + minutes + " : " + seconds;

                    // If the minutes are superior to 10 and the seconds inferior to 10, print a 0 before seconds
                } else if (hours == 0 && minutes > 10 && seconds < 10) {
                    document.querySelector('#timer').innerHTML = minutes + " : 0" + seconds;

                    // Print no 0 if none of the previous conditions are true
                } else {
                    document.querySelector('#timer').innerHTML = minutes + " : " + seconds;
                }

                // If the minutes are equel to 60 increase the hour counter by 1
                if (minutes > 59) {
                    hours++
                    minutes = 0;
                }

                // If the hours are superior to 1, print the hours
                if (hours >= 1) {
                    document.querySelector('#timer').innerHTML = hours + " : " + minutes + " : " + seconds;
                }
            }, 1000);


            // Update the timer on the html

            body.innerHTML += `
        <div id="timer">
        <p>${timer}</p>
        </div>`
        }

        // If timer is stopped
    } else {

        // Remove the timer from the body and put end on true
        let body = document.querySelector('body');
        let timer = document.querySelector('#timer');
        body.removeChild(timer);
        end = true;
    }


}

//--------------------------------------------//

// Function to generate our grid and our cards

function generateGrid() {




    let grid = document.querySelector('#grille')

    // Initialize our different Decks of Cards //
    let Flowers = ["Flower1", "Flower1", "Flower2", "Flower2", "Flower3", "Flower3", "Flower4", "Flower4", "Flower5", "Flower5", "Flower6", "Flower6"]
    let Sushis = ["Sushi1", "Sushi1", "Sushi2", "Sushi2", "Sushi3", "Sushi3", "Sushi4", "Sushi4", "Sushi5", "Sushi5", "Sushi6", "Sushi6"]
    let Dogs = ["Dog1", "Dog1", "Dog2", "Dog2", "Dog3", "Dog3", "Dog4", "Dog4", "Dog5", "Dog5", "Dog6", "Dog6"]
    let Fruits = ["Fruits1", "Fruits1", "Fruits2", "Fruits2", "Fruits3", "Fruits3", "Fruits4", "Fruits4", "Fruits5", "Fruits5", "Fruits6", "Fruits6"];
    let Birds = ["Bird1", "Bird1", "Bird2", "Bird2", "Bird3", "Bird3", "Bird4", "Bird4", "Bird5", "Bird5", "Bird6", "Bird6"];
    let Cats = ["Cat1", "Cat1", "Cat2", "Cat2", "Cat3", "Cat3", "Cat4", "Cat4", "Cat5", "Cat5", "Cat6", "Cat6"];

    // End //

    // List of all our decks that aviable in the game
    let Decks = [Fruits, Cats, Dogs, Flowers, Birds, Sushis];

    // On load generate our grid
    window.addEventListener('load', () => {

        // Generate a randomizer to chose our deck
        let deck = Decks[Math.floor(Math.random() * Decks.length)]

        // Place the cards of the selected deck into the grid
        for (let i = 0; i < 12; i++) {
            let card = deck[Math.floor(Math.random() * deck.length)];
            let index = deck.indexOf(card);
            deck.splice(index, 1);
            card = card.replace(/['"]+/g, '')



            // Make a structure for our cards
            grid.innerHTML += `  
    <div class = "carte" data-attr="${card}">
        <div class = "double-face">
        <div class = "face">
        <img src = "ressources/decks/${card}.png"></div> 
        <div class = "arriere" >
    </div>`

            // Stock our cards in an array to use it later
            cards.push(card);
        }

    })

}

//--------------------------------------------//

// console.log(cards);
//--------------------------------------------//



// Function to play the Memory game

async function play() {

    // Initialization of the Variables //
    let body = document.querySelector('body');
    // console.log(cards);
    let cardFlipped = [];
    let cardFlippedSameTime = []
    let cardAttr = []
    let end = false;
    // End //

    //console.log(toFlip)

    // When we go through a card that is flipable (if the backwards of the card is showed) and if it is change the cursor to pointer

    document.addEventListener('mouseover', (e) => {

        if (e.target.classList.contains('arriere')) {

            e.target.style.cursor = 'pointer';
        }
    });

    // When we click on it flip the card
    document.addEventListener('click', (e) => {

        // If the card is backward and that no card has been turned yet

        if (e.target.classList.contains('arriere') && cardFlippedSameTime.length < 1) {

            // console.log(cardFlippedSameTime.length);
            //console.log(e.target.classList)

            // Remove the shadow of the card
            e.target.parentNode.parentNode.style.boxShadow = '0 0 0 0';

            // Flip the card
            flip(e.target.parentNode);

            // Push the card into arrays
            cardFlipped.push(e.target.parentNode);
            cardFlippedSameTime.push(e.target.parentNode);
            cardAttr.push(e.target.parentNode.parentNode.getAttribute('data-attr'));
            //console.log(cardAttr);

            // If there are two elements in the Attribute array and that the attributes are not matching return the cards
            if (cardFlipped.length === 2 && (cardAttr[0] != cardAttr[1])) {
                //console.log(cardFlipped[0]);
                //console.log(cardFlipped[1]);
                notMatch(cardFlipped[0], cardFlipped[1]);
                // Empty the arrays
                cardFlipped = [];
                cardAttr = [];

                // If they are matching
            } else if (cardFlipped.length === 2 & cardAttr[0] === cardAttr[1]) {

                // Play differents sound matching the "incredibleness" of the found
                if (cardAlreadyDiscovered.includes(cardAttr[0] || cardAttr[1])) {
                    console.log(cards)
                    let Right = new Audio('ressources/Sound/Nice.mp3');
                    Right.play();
                } else if (cards.length > 2) {
                    setTimeout(() => {
                        let What = new Audio('ressources/Sound/What.mp3');
                        What.play();
                    }, 500);
                } else {
                    let Right = new Audio('ressources/Sound/Nice.mp3');
                    Right.play();
                }

                // console.log(cardFlipped[0].parentNode.getAttribute('data-attr'));
                // console.log(cardFlipped[1].parentNode.getAttribute('data-attr'));

                // Remove both cards from the list of cards
                cards.splice(cards.indexOf(cardFlipped[0].parentNode.getAttribute('data-attr')), 1);
                cards.splice(cards.indexOf(cardFlipped[1].parentNode.getAttribute('data-attr')), 1);

                // If a card already exists in card Discovered push the other one, and if both does not exist, push both of them
                if (cardAlreadyDiscovered.includes(cardAttr[0])) {
                    cardAlreadyDiscovered.push(cardAttr[1]);
                } else if (cardAlreadyDiscovered.includes(cardAttr[1])) {
                    cardAlreadyDiscovered.push(cardAttr[0]);
                } else {
                    cardAlreadyDiscovered.push(cardAttr[0]);
                    cardAlreadyDiscovered.push(cardAttr[1]);
                }
                // Void the arrays
                console.log(cards);
                cardFlipped = [];
                cardAttr = [];
            }
            // After .9 seconds, void the array that permits to play if empty
            setTimeout(() => {
                cardFlippedSameTime = [];
            }, 900);
        }

        setTimeout(() => {
            // If we don't have any card left in our array of cards 
            if (cards.length == 0 && !end) {


                // Print Victory on the screen with the timer
                body.innerHTML += `
                <div id="end">
                <div id="CONGRATS">
                <h1>Congrats !</h1>
                </div>
                <div>
                <p>You won in a time of ${document.querySelector('#timer').innerHTML}</p>
                </div>`

                // Stop the timer and erase it from the screen
                startTimer(false);


                // Play the sound of victory
                let Victory = new Audio('ressources/Sound/DreamingHarp.mp3');
                Victory.play();

                // Print a button restart
                body.innerHTML += `  
                <button class="btnRestart">Restart a Game</button>`

                document.removeEventListener('click', play)
                end = true;
            }
        }, 1000);
        //--------------------------------------------//


    })



    //************** INTERNAL FUNCTIONS **************//

    //--------------------------------------------//


    // Flip a card 
    async function flip(card) {

        // Put the class that will permit to flip the card and play the sound
        card.classList.toggle("active");
        let flip = new Audio('ressources/Sound/Flip.mp3');
        flip.play();
    }


    //--------------------------------------------//

    //--------------------------------------------//


    async function notMatch(card1, card2) {

        // If we got wrong and that Symbols are not matching play the sound wrong
        setTimeout(() => {
            let Wrong = new Audio('ressources/Sound/Wrong.mp3');
            Wrong.play();
        }, 500);

        // After 1 second flip the cards backwards
        setTimeout(() => {
            card1.classList.toggle("active");
            card2.classList.toggle("active");

        }, 1000);

        // Push the cards to our cards already discovered
        cardAlreadyDiscovered.push(card1.parentNode.getAttribute('data-attr'));
        cardAlreadyDiscovered.push(card2.parentNode.getAttribute('data-attr'));
        //console.log(cardAlreadyDiscovered);
    }

    //--------------------------------------------//


    //************** END OF INTERNAL FUNCTIONS **************//
}

//--------------------------------------------//

// Function to return every card at the end
async function returnEveryCard() {
    let cards = document.querySelectorAll('.double-face');
    cards.forEach(card => {
        card.classList.toggle("active");
    });
}

//--------------------------------------------//


//************** END OF MAIN FUNCTIONS **************//


//************** STARTING OF OUR GAME **************//

document.addEventListener("DOMContentLoaded", () => {

    // Create a button yes and a button no to start music
    document.body.innerHTML += `
    <button id="start" class="btnMusic">Play Music</button>
    <button id="stop" class="btnMusic">Stop Music</button>`




    // Start the timer
    startTimer(true);

    // Generate the grid
    generateGrid();

    let Music = new Audio('ressources/Sound/MusicMemory.mp3');
    Music.volume = 0.2;

    // Start the main music when button play is pressed
    document.querySelector('#start').addEventListener('click', () => {
        // If music does not exist create it and play it

        Music.play();
        document.querySelector('#start').style.opacity = '0';
        document.querySelector('#stop').style.opacity = '1';
        document.querySelector('#start').style.zIndex = '-1';
        document.querySelector('#stop').style.zIndex = '1';

    });

    // Stop the main music when button stop is pressed
    document.querySelector('#stop').addEventListener('click', () => {
        Music.pause();
        document.querySelector('#start').style.opacity = '1';
        document.querySelector('#stop').style.opacity = '0';
        document.querySelector('#start').style.zIndex = '1';
        document.querySelector('#stop').style.zIndex = '-1';
    });

    //Permit to our player to play the game
    play();


});

//************** END **************//


//************** RESET OF OUR GAME **************//

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnRestart')) {
        returnEveryCard();
        setTimeout(() => {
            location.reload();
        }, 180);
    }
});

//************** END **************//