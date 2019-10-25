import React from 'react'

class LettersGame extends React.Component {

  state = {
    randomString: "",
    answerString: ""
  }

  gameNumberLength = () => { return 20}

  startGame = () => {
    this.setState({
      randomString: this.randomString(this.gameNumberLength()),
      answerString: ""
    })
    this.props.startGame()
    // The below line with put focus on the answer input once they click the start button
    // when paired with the "ref={(input) => { this.nameInput = input; }" sttribute in the input tag
    this.nameInput.focus()
  }

  changeAnswerString = (event) => {
    this.setState({
      answerString: event.target.value
    })
    this.checkForCompletion(event.target.value)
  }

  checkForCompletion = (answer) => {
    if (this.state.randomString === answer) {
      this.props.endGame()
    }
  }
  
  inputColor = () => {
    return this.state.answerString === this.state.randomString.slice(0,this.state.answerString.length) ? {color : 'black'} : {color : 'red'} ;
  }

  randomString = (length) => {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   let charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  } 

  render() {
    let button = this.props.gameOn ? 
      null
    :
      <button onClick={this.startGame} >Start New Game</button>;


    return(
      <div>
        {button}
        <br />
        <h3 style={this.inputColor()}>Your text to match: {this.state.randomString}</h3>
        <form onSubmit={(e) => e.preventDefault()}>
         <h2>Match 'em! <input autoFocus spellCheck='false' type="text" value={this.state.answerString} onChange={this.changeAnswerString} ref={(input) => { this.nameInput = input; }} /> </h2> 
        </form>
      </div>
    ) // ends return
  } // ends render
}  // ends class

export default LettersGame;