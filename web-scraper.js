const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.fdj.fr/jeux-de-tirage/loto/resultats";
let arr = []
let yourData = ""


fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('.result-full__list');
    statsTable.each(function() {
      
        let title = $(this).find('li').text();
        arr.push(title)
    });
    let jsonString = JSON.stringify(arr[1]);
    // JSON to Object / Array
    yourData += JSON.parse(jsonString);
console.log(yourData)
    
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

const express = require('express')
const app = express()
app.get('/', function (req, res) {
    res.send(yourData)
   })
app.listen(3000, function () {
console.log('Votre app est disponible sur localhost:3000')
})
