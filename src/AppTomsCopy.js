import React from 'react';
import './App.css';
import GameContainer from './containers/GameContainer';
import ScoreContainer from './containers/ScoreContainer';


class AppTomsCopy extends React.Component  {

  state = {
    scoreContextObject: {
      outputStart: "",
      perSecondVariable: 1,
      outputEnd: "seconds passed.  Yeah, not real interesting, is it?  PICK A DIFFERENT CONTEXT!",
      unit: "seconds"
    },
    selectedGameObj: {},
    top10Scores: [],
    allContextOptionsArr: []

  }

  fetchContextOptionsForDropdown = () => {
    fetch("http://localhost:3000/api/v1/scoreContexts")
    .then(resp => resp.json())
    .then(arr => {
        this.setState({
            allContextOptionsArr: arr})
    })
}
  
  setScoreContextType = (selectedid) => {
    let selectedObj=this.state.allContextOptionsArr.find(obj => obj.id === parseInt(selectedid)) 
      this.setState({
        scoreContextObject: selectedObj
      })
  }
  
  acceptGameObj = (obj) => {
    console.log("this is the passed id up to APP", obj)
      this.setState({
        selectedGameObj: obj
      })
      fetch("http://localhost:3000/api/v1/scores/" + obj.id)
                .then(resp => resp.json())
                .then(arr => {
                    this.setState({
                      top10Scores: arr
                    })
                })
    }
  
  render() {
    console.log("Top10score from App state: ", this.state.top10Scores)
    return (
      
        <>
        <div>

        <GameContainer scoreContextObject={this.state.scoreContextObject} acceptGameObj={this.acceptGameObj} />
        </div>
        <div>

        <ScoreContainer allContextOptionsArr={this.state.allContextOptionsArr} setScoreContextType={this.setScoreContextType} top10Scores={this.state.top10Scores} fetchContextOptionsForDropdown={this.fetchContextOptionsForDropdown} scoreContextObject={this.state.scoreContextObject} gameName={this.state.selectedGameObj.name} />
        </div>
        </>
      
    ) // ends Return
  } // ends Render
} // ends Class

export default AppTomsCopy;
