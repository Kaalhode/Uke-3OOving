export const poem = "Ensom Alene i stillhet, går vi hver vår vei<br> Ensomheten fyller oss <br> Glede er noe vi ikke kjenner til.<br> Men vi vet noe i livet. Sannheten.<br> Snart vil folk forstå.<br> Enn så lenge, gjør vi som vi gjør.<br> Vi vet da, hva som skjer i morgen.<br> I morgen møter vi verden med vår ensomhet.<br> Dikt skrevet av Snowder (ris og ros) fra dikt.org";

export const quotes = [
    "A thought about yourself is an opinion, not a fact.<br> You are good enough, and you deserve to be happy.",
    "Because I have this movie, I'll get to see you every time i watch it.<br>No matter how many times I forget you...<br> I'll remember you again and again.",
    "...the way it blurred the line between fact and fiction, for me, that was a good puzzle.",
    "I won't regret it one bit! I can't! Because I know that what I did was definitely not wrong!",
    "Im a idiot.<br> Im even bad at being depressed",
    "I say I have no reason to win, but why is it so painful when I lose?<br> I am so half-hearted about everything"
];

export function getRandomQuote(quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

