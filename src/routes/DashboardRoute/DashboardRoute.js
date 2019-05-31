import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext';
import './DashboardRoute.css';

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
        if (e.error === 'Unauthorized request') {
            this.context.processLogout();
            this.props.history.push('/login');
        }
      });
  }

  render() {
    return (
      <section>
        <h2>{this.state.language.name}</h2>
        <h2>{'Total correct answers: ' + this.state.language.total_score}</h2>

        <a className='start-practicing' href='/learn'>Start practicing</a>

        <h3>Words to practice</h3>

        <ul className='practice-list'>
          {this.state.words.length && this.state.words.map(word => {
            return(
              <li key={word.id} className="dashboard-word">
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
