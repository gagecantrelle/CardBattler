# CardBattler

A small game project that will allow players to fight against bots in two types of games: Rock, Paper, Scissors and Blackjack.
This version of Blackjack uses a 21-card challenge where you add cards equal to or close to 21. For Rock, Paper, Scissors,
there is no special rule added, but you're able to set how many rounds you want
to play.

# rules

-Rock, Paper, Scissors
Pick one of three items: Rock, Paper, and Scissors, then whoever has the strongest item wins
-Rock > Scissors
-Scissors > Paper
-Paper > Rock

-BlackJack
Draws from a 20-card deck with 2 copies of each card, ranging from 1 to 10. The player whose
card total value that equal to 21 or close to it. If the Value goes over 21, they lose

# setup

-GoogleAuth
for you to use this work you need a Google id key and Google secrete key. For this you need to go to this link https://console.cloud.google.com/apis/dashboard
then login to your google account, if your not all-ready log in .Click the Credentials, This will bring up your credentials page
that will hold all your api keys and secret keys. On the top of the page click the +credentials button and select OAuth.
Then place in the flowing
-Application Type: Web Application
-Name: any name you want
-Authorized JavaScript Origins: your http://localhost:(what ever port your using)
-Authorized Redirect URLS: http://localhost:(what ever port your using)/auth/google/callback
