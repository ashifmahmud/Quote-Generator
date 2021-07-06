const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQoutes = [];

//show loading

function loading(){
  loader.hidden = false;
  quoteContainer.hidden=true;
}

//hider loading

function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;
}

//Show new quote

function newQuote(){
  loading();
  //pick a random quote from apiQoutes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  //check if author field is black and replace it with quote unknow

  if(!quote.author){
    authorText.textContent = 'Unknown';
  }
  else{
    //set quote,hide loader
    authorText.textContent = quote.author;
    complete();
  }

  //check quote length to determine styling
  if (quote.text.length>100){
    quoteText.classList.add('long-quote');
  }
  else{
    quoteText.classList.remove('long-quote');
  }



  quoteText.textContent = quote.text;

}
// Get quotes from API
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  }
  catch(error){

    //Catch Error here
  }
}

newQuoteBtn.addEventListener('click',newQuote);

getQuotes();