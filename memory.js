
const memoryGame = document.querySelector('.memory-game');
const scoreboard = document.querySelector('.scoreboard');

const kaartenImagesLijst = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '5.jpg', '6.jpg', '7.jpg', '8.jpg',
    '1.jpg', '2.jpg', '3.jpg', '4.jpg',
    '5.jpg', '6.jpg', '7.jpg', '8.jpg'
];

let selectedCards = [];
let matchedPairs = 0;
let isFlipped = false; // kaart kan op geklikt worden
let aantalPogingen = 0;

const startButton = this.document.querySelector(".startButton");
startButton.addEventListener("click", maakSpeelbord);

const resetButton = this.document.querySelector(".resetButton");
resetButton.addEventListener("click", resetGame);

function maakSpeelbord() {
    document.body.className = "background2";
    startButton.style.display = 'none';
    resetButton.style.display = 'block';
    
    matchedPairs = 0;
    aantalPogingen = 0;
    memoryGame.innerHTML = ''; //bord leegmaken voor als er al een spel is gespeelt.

    schudKaarten(kaartenImagesLijst);
    voegKaartDivjesToeAanHtml();
}
//chatgpt: In javascript. Voor mijn memory game: Ik heb een lijst met 16 kaart afbeeldingen.
//Maak een functie die div elementen toevoegt aan mijn section 'memoryGame'.
//En wanneer ik op een div klik, moet de kaart omgedraaid worden.
function voegKaartDivjesToeAanHtml() {

    for (let index = 0; index < kaartenImagesLijst.length; index++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.style.backgroundImage = `url("cover.jpg")`;

        card.addEventListener('click', handleCardClick);
        card.addEventListener('mouseenter', kaartHover);
        card.addEventListener('mouseleave', kaartRemoveHover);

        memoryGame.appendChild(card);
    }
}

function handleCardClick() {

    if (isFlipped) {
        return; //het is true, dus doe niets
    }

    const card = this;
    const index = parseInt(card.dataset.index);

    //chatgpt:hoe controleer ik of de gedraaide kaarten overeenkomen?
    if (!selectedCards.includes(card) && selectedCards.length < 2) {
        card.style.backgroundImage = `url(${kaartenImagesLijst[index]})`;
        card.classList.add('flipped');

        selectedCards.push(card);

        //als ik 2 kaarten heb controleer of het dezelfde is
        if (selectedCards.length == 2) {

            aantalPogingen++;

            isFlipped = true;  // niet te snel klikken

            // 1 sec wachten voordat het resultaat berekend wordt zodat je het resultaat kan zien wanneer het fout is.
            setTimeout(controlerenOfKaartenGelijkZijn, 1000);
        }
    }
}
function kaartHover() {
    const card1 = this;
    card1.classList.add('hover');

    if (selectedCards.length == 1) {
        const card2 = selectedCards[0];
        if (zijnKaartenGelijk(card1, card2)) {
            card1.classList.remove('hover');
            card1.classList.add('valsspelen');
        }
    }
}

function kaartRemoveHover() {
    const card1 = this;
    card1.classList.remove('hover');
    card1.classList.remove('valsspelen');
}

function controlerenOfKaartenGelijkZijn() {
    const [card1, card2] = selectedCards;

    if (zijnKaartenGelijk(card1, card2)) {
        goedGedraaid(card1, card2);
    } else {
        foutGedraaid(card1, card2);
    }

    selectedCards = [];
    isFlipped = false;

    //console.log(matchedPairs, kaartenImagesLijst.length);

    if (matchedPairs == kaartenImagesLijst.length) {
        einde();
    }
    else {
        updateScoreboard();
    }
}

function zijnKaartenGelijk(card1, card2) {
    const kaartNr1 = parseInt(card1.dataset.index);
    const kaartNr2 = parseInt(card2.dataset.index);

    if (kaartenImagesLijst[kaartNr1] == kaartenImagesLijst[kaartNr2]){
        return true;
    }
    else { 
        return false;
    }
}

function goedGedraaid(card1, card2) {
    card1.removeEventListener('click', handleCardClick);
    card2.removeEventListener('click', handleCardClick);
    matchedPairs += 2;
}

function foutGedraaid(card1, card2) {
    card1.style.backgroundImage = 'url("cover.jpg")';
    card2.style.backgroundImage = 'url("cover.jpg")';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
}

//chatgpt: Ik heb een lijst met kaart afbeeldingen: ['1.jpg','2.jpg','3.jpg']  
//Maak een functie die de kaarten door elkaar schud.
function schudKaarten(kaartenLijst) {
    for (let i = kaartenLijst.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [kaartenLijst[i], kaartenLijst[j]] = [kaartenLijst[j], kaartenLijst[i]];
    }
    return kaartenLijst;
}

function updateScoreboard() {
    const totalScore = matchedPairs / 2; //aantal 
    scoreboard.innerHTML = 'Score: ' + aantalPogingen + '/' + totalScore;
}
function einde() {
    const totalScore = matchedPairs / 2; //aantal 
    scoreboard.innerHTML = 'Gefeliciteerd, je hebt alle plaatjes gevonden. <br/> Je score is: ' + aantalPogingen + '/' + totalScore;
}
function resetGame() {
    maakSpeelbord();
    updateScoreboard();
}
