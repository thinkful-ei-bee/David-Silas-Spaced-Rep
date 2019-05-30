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
    isCorrect: null,
  }

  componentDidMount() {
    LanguageService.getHeadWord()
      .then(head => {
        this.setState({
          nextWord: head.nextWord,
          answer: null,
          lastWord: head.nextWord,
          wordCorrectCount: head.wordCorrectCount,
          wordIncorrectCount: head.wordIncorrectCount,
          totalScore: head.totalScore,
          guess: '',
          correctGuess: 0,
          isCorrect: null,
        })
      })
  }

  handleSubmitAnswer(event) {
    event.preventDefault()
    console.log(this.state.guess)

    // If a guess has already been submitted
    if (this.state.isCorrect !== null) {
      this.setState({
        answer: null,
        lastWord: this.state.nextWord,
        guess: '',
        correctGuess: 0,
        isCorrect: null,
      })

      return;
    }

    LanguageService.postGuess(this.state.guess)
      .then(head => {
        if (head.isCorrect) {
          this.setState({
            nextWord: head.nextWord,
            answer: head.answer,
            wordCorrectCount: head.wordCorrectCount,
            wordIncorrectCount: head.wordIncorrectCount,
            totalScore: head.totalScore,
            correctGuess: true,
            isCorrect: head.isCorrect,
          })
          return;
        }
        else {
          this.setState({
            nextWord: head.nextWord,
            answer: head.answer,
            wordCorrectCount: head.wordCorrectCount,
            wordIncorrectCount: head.wordIncorrectCount,
            totalScore: head.totalScore,
            correctGuess: false,
            isCorrect: head.isCorrect,
          })
          return;
        }
      })
  }

  handleChangeAnswer = (guess) => {
    this.setState({ guess: guess.target.value })
  }

  render() {
    let correctGuess = this.state.correctGuess;
    let inputField;
    
    if (correctGuess === 0) {
      inputField = [
      <label htmlFor='learn-guess-input'>What's the translation for this word?</label>,
      <input 
            type='text'
            name='guess'
            value={this.state.guess} 
            id='learn-guess-input' 
            className='guess' 
            onChange={(event) => this.handleChangeAnswer(event)}
            required></input>
    ];
  }
    return (
      <section>
        <h2>
          {correctGuess === 0 && 'Translate the word:'}
          {correctGuess === true && 'You were correct! :D'}
          {correctGuess === false && 'Good try, but not quite right :('}
        </h2>

        <span>{this.state.lastWord}</span>

        <form className='main_form' onSubmit={(event) => this.handleSubmitAnswer(event)}>
          {inputField}
          <button type='submit'>
            {this.state.nextWord === this.state.lastWord && 'Submit your answer'}
            {this.state.nextWord !== this.state.lastWord && 'Try another word!'}
          </button>
        </form>

        <div className='DisplayScore'>
          <p>
            {`Your total score is: ${this.state.totalScore}`}
          </p>
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
