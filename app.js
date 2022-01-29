// Blackjack
const prompt = require('prompt-sync')()

const DECK = {
    dwojka: 2,
    trojka: 3,
    czworka: 4,
    piatka: 5,
    szostka: 6,
    siodemka: 7,
    osemka: 8,
    dziewiatka: 9,
    dziesiatka: 10,
    jopek: 10,
    dama: 10,
    krol: 10,
    as: 11
}
let players = []
let key
let howManyPlayers

const getKey = () => Object.keys(DECK)[
    Math.floor(
        Math.random() * Object.keys(DECK).length
    )];


class GameMechanics {
    constructor() {
        this.sum = 0
        this.hasAs = 0
        this.isStand = false
        this.lose = false
        this.hand = []
        this.hit()
        this.hit()
    }

    // Hit the card (improve by split method)
    hit() {
        key = getKey()
        if(DECK[key] === 11) {
            this.hasAs += 1
        }
        this.sum += DECK[key]
        this.hand.push(key)
        // this.sum = this.hand.reduce((sum, currentCard) => {
        //     return sum + DECK[currentCard]
        //     if(DECK[currentCard] === 11){
        //         this.hasAs += 1
        //     }
        // }, 0)
        // console.log(this.hasAs)
        if(this.sum > 21 && this.hasAs > 0) {
            this.sum -= 10
            this.hasAs -= 1
        } else if(this.sum > 21 && this.hasAs === 0) {
            this.lose = true
            this.isStand = true
            console.log(`${this.name} lose! Your score makes more than 21!`)
        }
    }

    // Split cards on hand (to do)
    split() {
        if(this.hand[0] === this.hand[1]) {
            this.secondHand = this.hand.pop()
            this.hit()
            this.hit()
        }
    }

    blackjack() {
        if(DECK[this.hand[0]] + DECK[this.hand[1]] === 21) {
            console.log(`BlackJack! ${this.name} won!`)
            this.isStand = true
        }
    }

    stand() {
        this.isStand = true
    }
}

class Dealer extends GameMechanics {
    constructor(Dealer) {
        super(Dealer);
        console.log(`Dealer's first card is: ${this.hand[0]}`)

    }

    check() {
        if(players.every(player => player.isStand === true)) {
            console.log("Dealer's hand: " + this.hand + "and his total score is: " + this.sum)
            this.blackjack()
            while(this.sum < 16) {
                this.hit()
            }
            console.log("Dealer's final hand: " + this.hand + " and his total score is: " + this.sum)
            if(this.sum > 21) {
                this.lose = true
                console.log("Dealer's lose! Players win!")
            } else {
                let playersInGame = players.filter(inGamePlayers => inGamePlayers.lose === false && this.sum <= inGamePlayers.sum)
                // console.log(playersInGame)
                if(playersInGame.length === 0) {
                    console.log(`Dealer's win! Dealer's sum: ${this.sum}!`)
                } else {
                    console.log(`Dealer's sum: ${this.sum}`)
                    playersInGame.forEach(el =>
                        console.log(`${el.name}'s win! Sum: ${el.sum}`)
                    )
                }
            }
        }

    }
}

class Player extends GameMechanics {
    constructor(name) {
        super(name);
        this.name = name
    }

    display() {
        return `${this.name}'s hand: ${this.hand}. ${this.name}'s score is: ${this.sum}`
    }
}

function prepare() {
    howManyPlayers = prompt(`How many players will be in game? `)
    howManyPlayers = parseInt(howManyPlayers)
    for(let i = 0; i < howManyPlayers; i++) {
        let name = prompt(`What is ${i + 1}'s player name? `)
        create(name)
    }
    console.log("-------------------")
}

function play() {
    players.forEach(el => {
        console.log(el.display())
        el.blackjack()
        console.log("-------------------")
    })
    while(players.some(player => player.isStand === false)) {
        playRound()
    }
}

function playRound() {
    let inGamePlayers = players.filter(player => player.isStand === false)
    inGamePlayers.forEach(el => {
        let decision = prompt(`${el.name}! Your actual hand is: ${el.hand} and your score is: ${el.sum}. What is your choice ${el.name} wariacie? `)
        switch(decision) {
            case "hit":
                el.hit()
                console.log(`${el.name} hits: ${key}. Total score is: ${el.sum}`)
                break
            case "split":
                el.split()
                break
            case "stand":
                el.stand()
                break
            default:
                el.stand()
                break
        }
        console.log("-------------------")
    })
    dealer.check()
}

function create(name) {
    return players.push(new Player(name))
}

prepare()
const dealer = new Dealer("Dealer")
play()







