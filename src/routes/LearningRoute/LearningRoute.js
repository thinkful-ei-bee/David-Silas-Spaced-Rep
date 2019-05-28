import React, { Component } from 'react'
import LanguageService from '../../services/language-service'


class LearningRoute extends Component {
  state = {
    nextWord: '',
    wordCorrectCount: null,
    wordIncorrectCount: null,
    totalScore: null,
  }

  componentDidMount() {
    LanguageService.getHeadWord()
      .then(head => {
        this.setState({
          nextWord: head.nextWord,
          wordCorrectCount: head.wordCorrectCount,
          wordIncorrectCount: head.wordIncorrectCount,
          totalScore: head.totalScore
        })
      })
  }

  render() {
    return (
      <section>
        <h2>{'Translate the word:'}</h2>
        <form className='main-form'>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input type='text' id='learn-guess-input' required></input>
          <button type='submit'>Submit your answer</button>
        </form>

        <p>{`Your total score is: ${this.state.totalScore}`}</p>

        <p>{`You have answered this word correctly ${this.state.wordCorrectCount} times.`}</p>
        <p>{`You have answered this word incorrectly ${this.state.wordIncorrectCount} times.`}</p>

        <span>Testnextword</span>
      </section>
    );
  }
}

export default LearningRoute
