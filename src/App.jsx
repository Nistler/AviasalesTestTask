import React, { Component } from 'react';
import { getTickets, generateKey } from './functions.js'
import './App.css';
import Ticket from './Ticket.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tickets: null };
  }

  getRequest = async () => {
    const responseID = await fetch('https://front-test.beta.aviasales.ru/search');
    const searchId = await responseID.json();
    const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`;
    const tickets = await getTickets(url, []);
    this.setState({ tickets });
  }

  render() {
    const { tickets } = this.state;
    return (
      <div id="container">
        <div className="filter">
          <div className="title">Количество пересадок</div>
          <div className="checkboxes">
            <div className="checkboxField">
              <input id="all" type="checkbox" />
              <label htmlFor="all">Все</label>
            </div>
            <div className="checkboxField">
              <input id="without" type="checkbox" />
              <label htmlFor="without">Без пересадок</label>
            </div>
            <div className="checkboxField">
              <input id="oneTransfer" type="checkbox" />
              <label htmlFor="oneTransfer">1 пересадка</label>
            </div>
            <div className="checkboxField">
              <input id="twoTransfers" type="checkbox" />
              <label htmlFor="twoTransfers">2 пересадки</label>
            </div>
            <div className="checkboxField">
              <input id="threeTransfers" type="checkbox" />
              <label htmlFor="threeTransfers">3 пересадки</label>
            </div>
          </div>
          <button onClick={this.getRequest} style={{width: 232 + 'px', marginTop: 30 + 'px'}}>Execute GET-request</button>
        </div>
        <div className="ticketsBlock">
          <div className="buttons">
            <button className="leftButton">Самый дешевый</button>
            <button className="rightButton">Самый быстрый</button>
          </div>
          <div className="tickets">
            {tickets && tickets
            .filter((ticket) => ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0)
            .slice(0, 5)
            .map((ticket) => <Ticket key={generateKey()} ticket={ticket} />)}
          </div>
        </div>
      </div>
    );
  }
}