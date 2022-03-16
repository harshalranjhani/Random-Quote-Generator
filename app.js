const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('.loader');
const facebookBtn = document.querySelector('#facebook');

let apiQuotes = [];

function loading(){
   loader.hidden = false; 
   quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const api_url = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(api_url);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (e) {
        console.log('Something went Wrong!');
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')
}


newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();