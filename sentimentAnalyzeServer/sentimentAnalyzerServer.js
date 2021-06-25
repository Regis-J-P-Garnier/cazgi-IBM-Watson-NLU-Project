const express = require('express');
const app = new express();
const dotenv = require('dotenv').config() //load and init

function getNLUInstance() {
    console.log('INITIALIZE WATSON KEYS');
    let api_key = process.env.API_KEY;//ok from /env
    let api_url = process.env.API_URL;//ok from .env
    // console.log(api_key);
    // console.log(api_url);
    console.log('INITIALIZE WATSON LIBS');
    const NaturalLanguageUnderstandingV1=require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    console.log('INITIALIZE INSTANCE OF WATSON LUv1');
    //console.log(api_key);
    //console.log(api_url);
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
        apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    console.log('WATSON LINK INITIALIZED');
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    nlu = getNLUInstance();
    console.log(nlu);
    return res.send({"happy":"90","sad":"10", "nlu version":nlu.version,});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

// ---------- EMOTIONS ------------

app.get("/text/emotion", (req,res) => {

    const analyzeParams = {
        'features': {
            'emotion': {
                'targets': [
                    'sadness',
                    'joy',
                    'fear',
                    'disgust',
                    'anger',
                ]
            }
        }
    };
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            console.log(nlu);
             return res.send(analysisResults);
        })
        .catch(err => {
            console.log('error:', err);
            return res.send(err);
        });
});

// ---------- SENTIMENTS -----------

app.get("/text/sentiment", (req,res) => {
    nlu = getNLUInstance();
    console.log(nlu);
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    nlu = getNLUInstance();
    console.log(nlu);
    console.log('Listening', server.address().port)
})

