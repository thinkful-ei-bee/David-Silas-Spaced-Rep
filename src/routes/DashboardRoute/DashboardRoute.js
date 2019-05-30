import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext';

class DashboardRoute extends Component {
  state = {
    language: {},
    words: [],
  }

  static contextType = UserContext;

  componentDidMount() {
    LanguageService.getAll()
      .then(res => {
        this.setState({
            language: res.language,
            words: res.words
          });
      }).catch(e => {
        console.log(e);
        if (e.error === 'Unauthorized request') {
            console.log('got inside the test');
            console.log(this.context);
            this.context.processLogout();
            this.props.history.push('/login');
        }
      });
  }

  render() {
    return (
      <section>
        <h2>{this.state.language.name}</h2>
        <h3>{'Total correct answers: ' + this.state.language.total_score}</h3>

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
