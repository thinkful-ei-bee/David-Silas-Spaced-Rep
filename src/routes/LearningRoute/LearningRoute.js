import React, { Component } from 'react'
import LanguageService from '../../services/language-service'


class LearningRoute extends Component {
  state = {
    nextWord: '',
    answer: null,
    lastWord: '',
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
    guess: '',
    correctGuess: 0,
  }

  componentDidMount() {
    LanguageService.getHeadWord()
      .then(head => {
        this.setState({
          nextWord: head.nextWord,
          lastWord: head.nextWord,
          wordCorrectCount: head.wordCorrectCount,
          wordIncorrectCount: head.wordIncorrectCount,
          totalScore: head.totalScore
        })
      })
  }

  handleSubmitAnswer(event) {
    event.preventDefault()
    console.log(this.state.guess)
    LanguageService.postGuess(this.state.guess)
      .then(head => {
        if(head.totalScore === this.state.totalScore) {
          this.setState({
            nextWord: head.nextWord,
            answer: head.answer,
            wordCorrectCount: head.wordCorrectCount,
            wordIncorrectCount: head.wordIncorrectCount,
            totalScore: head.totalScore,
            correctGuess: false
          })
        }

        else if (head.totalScore > this.state.totalScore) {
          this.setState({
            nextWord: head.nextWord,
            answer: head.answer,
            wordCorrectCount: head.wordCorrectCount,
            wordIncorrectCount: head.wordIncorrectCount,
            totalScore: head.totalScore,
            correctGuess: true
          })
        }

      })
  }

  handleChangeAnswer = (guess) => {
    this.setState({ guess: guess.target.value })
  }

  render() {
    let correctGuess = this.state.correctGuess
    return (
      <section>
        <h2>
          {correctGuess === 0 && 'Translate the word:'}
          {correctGuess === true && 'You were correct! :D'}
          {correctGuess === false && 'Good try, but not quite right :('}
        </h2>

        <span>{this.state.nextWord}</span>

        <form className='main_form' onSubmit={(event) => this.handleSubmitAnswer(event)}>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input 
            type='text' 
            id='learn-guess-input' 
            className='guess' 
            onChange={(event) => this.handleChangeAnswer(event)}
            required></input>
          <button type='submit'>
            {this.state.nextWord === this.state.lastWord && 'Submit your answer'}
            {this.state.nextWord !== this.state.lastWord && 'Try another word!'}
          </button>
        </form>

        <div className='DisplayScore'>
          <p>{`Your total score is: ${this.state.totalScore}`}</p>
        </div>

        <div className='DisplayFeedback'>
          <p>{this.state.answer && `The correct translation for ${this.state.lastWord} was ${this.state.answer} and you chose ${this.state.guess}!`}</p>
        </div>

        <p>{`You have answered this word correctly ${this.state.wordCorrectCount} times.`}</p>
        <p>{`You have answered this word incorrectly ${this.state.wordIncorrectCount} times.`}</p>
      </section>
    );
  }
}

export default LearningRoute
