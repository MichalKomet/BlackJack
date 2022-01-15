// Blackjack

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

const getKey = () => Object.keys(DECK)[
    Math.floor(
        Math.random() * Object.keys(DECK).length
    )];


class Game {
    constructor() {
        this.sum = 0
        this.hasAs = 0
        this.isStand = false
        this.lose = false
        this.hand = []
        this.hit()
        this.hit()
    }

    // Dobieranie kart (do udoskonalenia względem metody split)
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

    // Rozdzielenie kart w ręcę (do zrobienia)
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

class Dealer extends Game {
    constructor(Dealer) {
        super(Dealer);
        console.log(`Dealer's first card is: ${this.hand[0]}`)

    }

    check() {
        if(players.every(player => player.isStand === true)) {
            console.log(this.hand)
            this.blackjack()
            while(this.sum < 16) {
                this.hit()
            }
            console.log(this.hand)
            console.log(this.sum)
            if(this.sum > 21) {
                this.lose = true
                console.log("Dealer's lose! Players win!")
            } else {
                let playersInGame = players.filter(inGame => inGame.lose === false && this.sum <= inGame.sum)
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

class Player extends Game {
    constructor(name) {
        super(name);
        this.name = name
        console.log(`${this.name}'s hand: ${this.hand}. ${this.name}'s score is: ${this.sum}`)
        this.blackjack()
    }
}

function choose(choose) {
    let inGame = players.filter(player => player.isStand === false)
    inGame.forEach(el => {
        switch(choose) {
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
    })
    dealer.check()
}

function create(name) {
    return players.push(new Player(name))
}

const dealer = new Dealer("Dealer")

create("Michal")
create("John")
create("Joanna")
create("Ola")
create("Jan")
console.log("-------------------------------")
choose("hit")
choose("stand")







