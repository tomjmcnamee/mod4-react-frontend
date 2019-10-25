import React, {Component} from 'react';
import Score from '../components/Score';
import ScoreType from '../components/ScoreType';
import { thisTypeAnnotation } from '@babel/types';

class ScoreContainer extends Component {
    state={

    }
    
    render(){
        let scoreComponents = []
        scoreComponents = this.props.top10Scores.map(score => <Score key={score.id} scoreObj={score} scoreContextObject={this.props.scoreContextObject} />)

        
        
        return(
            <div className='ScoreContainer'>
                    <ScoreType allContextOptionsArr={this.props.allContextOptionsArr} 
                    setScoreContextType={this.props.setScoreContextType} 
                    scoreContextObject={this.props.scoreContextObject} 
                    fetchContextOptionsForDropdown={this.props.fetchContextOptionsForDropdown} 
                    top10Scores={this.props.top10Scores} />
                <div id="ScoreContainerRight">
                <h3>10 Quickest Scores for {this.props.gameName ? this.props.gameName : "Selected Game"} </h3>
                    <ol>{scoreComponents}</ol>
                </div>
            </div>
        );
    };
};

export default ScoreContainer;