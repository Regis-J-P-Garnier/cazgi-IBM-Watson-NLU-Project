import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}
          <table className="table table-bordered">
            <tbody>
            {
            this.props.emotions.map((item, index) => {
                return(
                <tr>
                <td>{JSON.stringify({item})}</td>
                <td>{JSON.stringify({index})}</td>
                </tr>); 
            })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
