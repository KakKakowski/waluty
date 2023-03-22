const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

const https= require("https");
// 

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

// app.get("/ala/ola", function(req,res){
//     res.sendFile(__dirname+"/osoby.html");
// })

app.post("/", function(req,res){
    var wartosc = Number(req.body.wartosc);
    var waluta = req.body.waluta;
    var wartoscPLN=0;

    const url = `https://api.nbp.pl/api/exchangerates/rates/c/${waluta}/today/`;

    https.get(url,function(response){

        response.on("data", function(data){
            var daneNBP = JSON.parse(data);
            // console.log(daneNBP);

            var usdKurs = daneNBP.rates[0].ask;
            wartoscPLN=usdKurs*wartosc;


            res.send(`Wartość ${wartosc} ${waluta} to ${wartoscPLN} złoty`);

        })
    })

    
})

// 

app.listen(process.env.PORT || 3000, function(){
    console.log("Odpaliłem się na porcie 3000");
})


//  -------------
    // var osoba = {
    //     imie:"Adam",
    //     wiek:12
    // };

// JSON

// var kurs = {
//     table: "C",
//     currency: ""
// }