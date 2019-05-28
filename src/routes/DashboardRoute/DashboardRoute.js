import React, { Component } from 'react'
import LanguageService from '../../services/language-service'


class DashboardRoute extends Component {
  state = {
    language: {},
    words: [],
  }

  componentDidMount() {
    LanguageService.getAll()
      .then(res => {
        console.log(res)
        this.setState({
          language: res.language,
          words: res.words
        })
      })
  }

  render() {
    return (
      <section>
        <h2>
        {this.state.language.name}
        {'Total correct answers: ' + this.state.language.total_score}
        </h2>

        <a href='/learn'>Start practicing</a>

        <h3>Words to practice</h3>

        <ul>
          {this.state.words.length && this.state.words.map(word => {
            return(
              <li key={word.id}>
                <h4>{word.original}</h4>
                <div>{'correct answer count: ' + word.correct_count}</div>
                <div>{'incorrect answer count: ' + word.incorrect_count}</div>
              </li>
            )
          })}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute
