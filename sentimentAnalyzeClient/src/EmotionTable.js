import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
            <thead>
            <tr>
                <th>index</th>
                <th>type</th>
                <th>text</th>
                <th>sadness</th>
                <th>joy</th>
                <th>fear</th>
                <th>disgust</th>
                <th>anger</th>
                <th>relevance</th>
            </tr>
            </thead>
            <tbody>
            {
            this.props.emotions.map((item, index) => {
                return(
                <tr>
                    <td>{JSON.stringify(index)}</td>
                    <td>{JSON.stringify(item.type)}</td>
                    <td>{JSON.stringify(item.text)}</td>
                    <td>{JSON.stringify(item.emotion.sadness)}</td>
                    <td>{JSON.stringify(item.emotion.joy)}</td>
                    <td>{JSON.stringify(item.emotion.fear)}</td>
                    <td>{JSON.stringify(item.emotion.disgust)}</td>
                    <td>{JSON.stringify(item.emotion.anger)}</td>
                    <td>{JSON.stringify(item.relevance)}</td>
                </tr>
                ); 
            })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;