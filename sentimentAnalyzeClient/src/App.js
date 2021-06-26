import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class SentimentList extends React.Component { // need upgrade and specialization
    render() {
      return ( 
        <div>{
            this.props.sentiments.map((item, index) => {return(<div>{item}</div>)})
        }</div>
        );
    };
};

class ConcatenateTables extends React.Component { // need upgrade and specialization
    render() {
      return ( 
        <div>{
            this.props.components.map((item, index) => {return({item})})      
        }
        </div>
        );
    }
};

class App extends React.Component {
  state = {innercomp:<textarea rows="4" cols="50" id="textinput"/>,
            mode: "text",
          sentimentOutput:[],
          sentimentPersonsOutput:[],
          sentiment:true,
          logvalue:""
        }


  setLogReturnedValue = (data) =>{
      this.logvalue = JSON.stringify(data, null, 2) ;
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
*/

  sendForSentimentAnalysis = () => {
    this.setState({sentiment:true});
    let ret = "";
    let url = ".";

    if(this.state.mode === "url") {
      url = url+"/url/sentiment?url="+document.getElementById("textinput").value;
    } else {
      url = url+"/text/sentiment?text="+document.getElementById("textinput").value;
    }
    /*
    ret = axios.get(url);
    ret.then((response)=>{

      //Include code here to check the sentiment and fomrat the data accordingly

      this.setState({sentimentOutput:response.data});
      this.setLogReturnedValue(response.data);
      let output = response.data;
    */
   // MOCK

    var response = {};
    response.data = { "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.88081, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.736151, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.970822, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "sentiment": { "score": 0, "label": "neutral" }, "relevance": 0.674048, "count": 1, "confidence": 0.993361 } ] };
    
    let outputArray = response.data.keywords.concat(response.data.entities);
    let outputString = '';
    let outputStringsArray = [];
    outputArray.map((item, index) => {
        if(item.sentiment.label === "positive") {
            outputString = <div style={{color:"green",fontSize:20}}>{item.text}</div>
        } else if (item.sentiment.label === "negative"){
            outputString = <div style={{color:"red",fontSize:20}}>{item.text}</div>
        } else {
            outputString = <div style={{color:"orange",fontSize:20}}>{item.text}</div>
        }
        outputStringsArray[index]=outputString
    });
    this.setLogReturnedValue(response.data);
    //this.setState({sentimentOutput:JSON.stringify(response.data.keywords[0])});
    //this.setState({sentimentPersonsOutput:JSON.stringify(response.data.entities[0])});
    // END MOCK
    this.setState({sentimentOutput:<SentimentList sentiments={outputStringsArray}/>});
    //this.setState({sentimentOutput:outputStringsArray});
    this.setState({sentimentPersonsOutput:""});
    //});*/
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
    /*
    ret = axios.get(url);

    ret.then((response)=>{
      this.setLogReturnedValue(response.data);
      this.setState({sentimentOutput:<EmotionTable emotions={response.data}/>});
  });*/
   // MOCK
   var response = {};
    response.data = { "usage": { "text_units": 1, "text_characters": 269, "features": 2 }, "language": "en", "keywords": [ { "text": "one-year bishopric", "relevance": 0.88081, "emotion": { "sadness": 0.140558, "joy": 0.391637, "fear": 0.067993, "disgust": 0.058289, "anger": 0.063817 }, "count": 1 }, { "text": "Ecumenical Patriarch of Constantinople", "relevance": 0.736151, "emotion": { "sadness": 0.125756, "joy": 0.193152, "fear": 0.06582, "disgust": 0.053097, "anger": 0.072421 }, "count": 1 } ], "entities": [ { "type": "Location", "text": "Constantinople", "relevance": 0.970822, "emotion": { "sadness": 0.106033, "joy": 0.363353, "fear": 0.051369, "disgust": 0.044808, "anger": 0.062089 }, "count": 3, "confidence": 0.988081 }, { "type": "Person", "text": "George", "relevance": 0.674048, "emotion": { "sadness": 0, "joy": 0, "fear": 0, "disgust": 0, "anger": 0 }, "count": 1, "confidence": 0.993361 } ] };
    
    this.setLogReturnedValue(response.data);
    this.setState({sentimentOutput:<EmotionTable emotions={response.data.keywords}/>});
    this.setState({sentimentPersonsOutput:<EmotionTable emotions={response.data.entities}/>});
    this.setState({sentimentOutput:<ConcatenateTables components={[this.state.sentimentOutput,this.state.sentimentPersonsOutput]}/>});
    // END MOCK
   
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
         <br/>
         <h2>"DEBUG : response from Watson with NODE by JSON over HTTP"</h2>
         {this.logvalue}
         <br/>
         <h2>"OUTPUT : response from Watson with REAL"</h2>
         {this.state.sentimentOutput}
      </div>
      );
    }
}
//<br/>
//            {this.state.sentimentOutput}
//        <br/>
//            {this.logvalue}
//        <br/>
export default App;
