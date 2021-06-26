import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentiment:true,
          logvalue:[],
        }


  setLogReturnedValue = (data) =>{
      this.setState({
                  logvalue: JSON.stringify(data, null, 2)
              });
    } 
  
  renderTextArea = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "url") {
      this.setState({innercomp:<textarea rows="4" cols="50" id="textinput"/>,
      mode: "text",
      sentimentOutput:[],
      sentiment:true
    })
    } 
  }

  renderTextBox = ()=>{
    document.getElementById("textinput").value = "";
    if(this.state.mode === "text") {
      this.setState({innercomp:<textarea rows="1" cols="50" id="textinput"/>,
      mode: "url",
      sentimentOutput:[],
      sentiment:true
    })
    }
  }

/* EMOTIONNAL RESPONSE
{ "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "relevance": 0.88081, "emotion": { "sadness": 0.140558, "joy": 0.391637, "fear": 0.067993, "disgust": 0.058289, "anger": 0.063817 }, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "relevance": 0.736151, "emotion": { "sadness": 0.125756, "joy": 0.193152, "fear": 0.06582, "disgust": 0.053097, "anger": 0.072421 }, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "relevance": 0.970822, "emotion": { "sadness": 0.106033, "joy": 0.363353, "fear": 0.051369, "disgust": 0.044808, "anger": 0.062089 }, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "relevance": 0.674048, "emotion": { "sadness": 0, "joy": 0, "fear": 0, "disgust": 0, "anger": 0 }, "count": 1, "confidence": 0.993361 } ] }
*/

/* SENTIMENTAL RESPONSE
{ "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.88081, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.736151, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.970822, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.674048, "count": 1, "confidence": 0.993361 } ] }
{
  "usage": {
    "text_units": 1,
    "text_characters": 6837,
    "features": 2
  },
  "retrieved_url": "https://en.wikipedia.org/wiki/George_I_of_Constantinople",
  "language": "en",
  "keywords": [
    {
      "text": "Terms of Use",
      "relevance": 0.659964,
      "emotion": {
        "sadness": 0.107056,
        "joy": 0.162192,
        "fear": 0.030613,
        "disgust": 0.149681,
        "anger": 0.049642
      },
      "count": 1
    },
    {
      "text": "Byzantine period",
      "relevance": 0.592172,
      "emotion": {
        "sadness": 0.135427,
        "joy": 0.032726,
        "fear": 0.31763,
        "disgust": 0.087577,
        "anger": 0.065639
      },
      "count": 1
    }
  ],
  "entities": [
    {
      "type": "Location",
      "text": "Constantinople",
      "relevance": 0.950869,
      "emotion": {
        "sadness": 0.069825,
        "joy": 0.414539,
        "fear": 0.022974,
        "disgust": 0.068648,
        "anger": 0.092213
      },
      "count": 17,
      "confidence": 1
    },
    {
      "type": "Person",
      "text": "George",
      "relevance": 0.306308,
      "emotion": {
        "sadness": 0.317465,
        "joy": 0.078998,
        "fear": 0.235657,
        "disgust": 0.21406,
        "anger": 0.119763
      },
      "count": 6,
      "confidence": 1
    }
  ]
}
*/

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
    // send GET URL -> "url" field
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
    // send GET TEXT -> "text" field
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }

    ret = axios.get(url);
    ret.then((response)=>{
        // MOCK
        // var response = {};
        // response.data = { "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.88081, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.736151, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.970822, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.674048, "count": 1, "confidence": 0.993361 } ] };
        // END MOCK
        let outputArray = response.data.keywords.concat(response.data.entities);
        this.setState({sentimentOutput: <div></div>});
        this.setLogReturnedValue(response.data);
        outputArray.map((item, index) => { //convert
            if(item.sentiment.label === "positive") {
            return(this.setState({sentimentOutput: <div>{this.state.sentimentOutput} <div style={{color:"green",fontSize:20}}>{item.text}</div></div>}));
            } else if (item.sentiment.label === "negative"){
               return(this.setState({sentimentOutput: <div>{this.state.sentimentOutput} <div style={{color:"red",fontSize:20}}>{item.text}</div></div>}));
            } else {
               return(this.setState({sentimentOutput: <div>{this.state.sentimentOutput} <div style={{color:"orange",fontSize:20}}>{item.text}</div></div>}));
            }          
            });
        //this.setState({sentimentOutput:<SentimentList sentiments={null} />});
        //this.setState({sentimentOutput:<SentimentList sentiments={resultsArray}/>});
        });
  }

  sendForEmotionAnalysis = () => {
    this.setState({sentiment:false});
    let ret = "";
    let url = ".";
    if(this.state.mode === "url") {
      url = url+"/url/emotion?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/emotion/?text="+document.getElementById("textinput").value;
    }

    ret = axios.get(url);

    ret.then((response)=>{
        // MOCK
        //var response = {};
        //response.data = { "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "relevance": 0.88081, "emotion": { "sadness": 0.140558, "joy": 0.391637, "fear": 0.067993, "disgust": 0.058289, "anger": 0.063817 }, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "relevance": 0.736151, "emotion": { "sadness": 0.125756, "joy": 0.193152, "fear": 0.06582, "disgust": 0.053097, "anger": 0.072421 }, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "relevance": 0.970822, "emotion": { "sadness": 0.106033, "joy": 0.363353, "fear": 0.051369, "disgust": 0.044808, "anger": 0.062089 }, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "relevance": 0.674048, "emotion": { "sadness": 0, "joy": 0, "fear": 0, "disgust": 0, "anger": 0 }, "count": 1, "confidence": 0.993361 } ] };
        // END MOCK 
        this.setLogReturnedValue(response.data);
        let concatenatedDatas = [response.data.keywords, response.data.entities];
        this.setState({sentimentOutput:<EmotionTable emotions={concatenatedDatas}/>});
    });
  }
  
  componentDidMount(){
    document.title = "Sentiment Analyzer"
  }

  render() {
    return (  
      <div className="App">
      <button className="btn btn-info" onClick={this.renderTextArea}>Text</button>
        <button className="btn btn-dark"  onClick={this.renderTextBox}>URL</button>
        <br/><br/>
        {this.state.innercomp}
        <br/>
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
         <br/><br/>
         <h2>"DEBUG : last response (buffered) from Watson with NODE by JSON over HTTP"</h2>
         <br/>{this.state.logvalue}
         <br/><br/>
         <h2>"OUTPUT : response from Watson with REAL"</h2> 
         <div id="output"></div>
         <br/>{this.state.sentimentOutput}   
      </div>
      );
    }
}//
export default App;
