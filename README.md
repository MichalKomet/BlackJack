Hello and welcome everyone in the BlackJack! The one of the most played gambling games in cassino! Let me introduce you my code that will make you a lot of fun in future. Why in future? It's simple! The code is incomplete yet! Don't worry! I am working at this, so stay tuned!

In real BlackJack players are playing against Dealer with several number of decks (6-8). In my version of this game players will be playing with infinity number of decks. This solution solves card counting problem and make this game completly random.  
Variable "deck" represents infinity number of decks and cards values.

Function "create" invoke "Player" class and is responsible for creating new players, with chosen name by players, and assign them to variable "players". Every new created have got two random cards from the "deck" by method "Hit" defined in "Game" class which is parent of "Player" class and push them to players hand. Instantly, method "blackjack" defined in "Game" class checks value of sum first two cards on hand. If value is equal to 21 method "blackjack" is telling us that this player won and change variable "isStand" assigned to this player to true.

Players can choose what they want to do. They can use method "stand" defined in "Game" class to pass and wait for Dealer's cards. This method changes variable "isStand" to true. Players can draw new card by using method "hit". This method generate a random card from the "deck", push it to players hand, add its value to player sum and checks whether this sum is more than 21. If is, method checks player hand. If player have card "as" in his hand, from the player's sum is substracted 10 points for every "as" on hand untill sum is less than 21 or equal to 21 or number of "as" is equal to 0. If value is still more than 21 and player has no more "as" player lose. His variable "isStand" and "lose" are turned to true.
In real game players can divide his first two card, if there are same, into two hands, draw one card to each of two hands and play these hands independently, but i haven't done that in my code. Maybe in future i will introduce it to my BlackJack. 

Function "choose" loop throughout every players in game with property "isStand" equal to false, giving them possibility to choose what they want to do: stand, hit, split (in future). When every player in "players" array decided what they want to do, this function invoke Dealer's method "check". In future this function will loop over untill every player will choose "stand".

The Dealer is creating on the same rules like players, but he is not pushed to "players" array, his only one card from hand is visible and his turn is starting when every players will stand or lose. Method "check" is invoke only when every players "isStand" is true. Then second card of his hand become visible and method "blackjack" checks his victory. If there is no BlackJack Dealer will hit cards untill his sum is less than 16. If his sum will be more than 21 that means the Dealer lost and players in game won. If Dealer's sum are 16 or more, but less than 22, Dealer's stop hitting and compare his sum with players in game. Players whose sum are more or equal to Dealer's sum, but less than 22, won.

For a while, i have to create players and choose for them what they will do for tests, but in future it can make players in program and choose what they want to do in realtime. 

In real BlackJack there are option like betting and insurence, but for this moment it is not necessary.

To run program use command "node app.js" in terminal. 
