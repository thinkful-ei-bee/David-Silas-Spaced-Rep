import React, { Component } from 'react'
import LanguageService from '../../services/language-service'


class LearningRoute extends Component {
  state = {
    language: {},
    words: [],
  }

  componentDidMount() {
    LanguageService.getAll()
      .then(res => {
        this.setState({
          language: res.language,
          words: res.words
        })
      })
  }

  render() {
    return (
      <section>
        <h2>{this.state.language.name}</h2>
      </section>
    );
  }
}

export default LearningRoute
