import React from 'react';
import './App.css';
import GameContainer from './containers/GameContainer';
import ScoreContainer from './containers/ScoreContainer';
import FactContainer from './containers/FactContainer';
import UserContainer from './containers/UserContainer';




class AppTomsCopy extends React.Component  {

  state = {
    scoreContextObject: {
      outputStart: "",
      perSecondVariable: 1,
      outputEnd: "seconds passed.  Yeah, not real interesting, is it?  PICK A DIFFERENT CONTEXT!",
      unit: "seconds",
      image: "https://www.filebuzz.com/software_screenshot/full/56774-Analogue_Vista_Clock.gif"
    },
    selectedGameObj: {},
    top10Scores: [],
    allContextOptionsArr: [],
    loggedInUser: {},
    facts: []
  }

  componentDidMount(){
    if (localStorage.token) {
      let token = localStorage.token
      fetch("http://localhost:3000/api/v1/autologin", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `${token}`
        }
      })
        .then(resp => resp.json())
        .then(userdata => this.setState({loggedInUser: userdata.user}))
    }
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
      fetch("http://localhost:3000/api/v1/facts/" + selectedid)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          scoreContextObject: selectedObj,
          facts : data
        })
      })
  }
  
  acceptGameObj = (obj) => {
      fetch("http://localhost:3000/api/v1/scores/" + obj.id)
                .then(resp => resp.json())
                .then(arr => {
                    this.setState({
                      selectedGameObj: obj,
                      top10Scores: arr
                    })
                }
                )
    }

    logIn = (userInfo) => {
      fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify(userInfo)
      })
        .then(resp => resp.json())
        .then(response => {
          localStorage.setItem("token", response.token)
          this.setState({
            loggedInUser: response.user
          }
          // This redirect the user to a new route
          // ,() => this.props.history.push("/s")
          )
        })
    }

    signUp = (userInfo) => {
      fetch("http://localhost:3000/api/v1/players", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify({ user: userInfo })
      })
        .then(resp => resp.json())
        .then(response => {
          //This next line logs the user in
          localStorage.setItem("token", response.token)
          this.setState({ loggedInUser: response.user })
        })
    }

    logOut = () => {
      localStorage.removeItem("token")
      this.setState({
        loggedInUser: {}
      })
    }

    postGameScore = (gameId, totalTime) => {
      console.log("Game Ended, post score, total secs", totalTime)
      fetch("http://localhost:3000/api/v1/scores", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify( {score_history: { game_id: parseInt(gameId), user_id: this.state.loggedInUser.id, score: totalTime }})
      // })
      //   .then(resp => resp.json())
      //   .then(response => {
      //     //This next line logs the user in
      //     localStorage.setItem("token", response.token)
      //     this.setState({ loggedInUser: response.user })
        }).then(this.acceptGameObj(this.state.selectedGameObj))
    }
  
  render() {
    return (
        <div className='MainContainer'>
          <GameContainer scoreContextObject={this.state.scoreContextObject} acceptGameObj={this.acceptGameObj} postGameScore={this.postGameScore}/>
          <ScoreContainer allContextOptionsArr={this.state.allContextOptionsArr} setScoreContextType={this.setScoreContextType} top10Scores={this.state.top10Scores} fetchContextOptionsForDropdown={this.fetchContextOptionsForDropdown} scoreContextObject={this.state.scoreContextObject} gameName={this.state.selectedGameObj.name} />
          <FactContainer facts={this.state.facts}/>
          <UserContainer loggedInUser={this.state.loggedInUser} logOut={this.logOut} logInSubmitHandler={this.logIn} signUpSubmitHandler={this.signUp} />
        </div>
      
    ) // ends Return
  } // ends Render
} // ends Class

export default AppTomsCopy;
