import React, { Component } from 'react';
import classNames from 'classnames';
import { getTickets, generateKey } from './functions.js'
import './App.css';
import Ticket from './Ticket.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tickets: null, isLoading: true, isMenuHiden: true };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = async () => {
    this.setState({ isLoading: true });
    const responseID = await fetch('https://front-test.beta.aviasales.ru/search');
    const searchId = await responseID.json();
    const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`;
    const tickets = await getTickets(url, []);
    this.setState({ tickets, isLoading: false });
  }

  toggleMenu = () => {
    const { isMenuHiden } = this.state;
    this.setState({ isMenuHiden: !isMenuHiden });
  }

  render() {
    const { tickets, isLoading, isMenuHiden } = this.state;
    const mobileFilter = classNames({
      filter: true,
      mobileFilter: !isMenuHiden
    });

    const mobileMenu = classNames({
      mobileMenu: true,
      mobileMenuOpened: !isMenuHiden
    });

    return (
      <div id="container">
        <button className={mobileMenu} onClick={this.toggleMenu} ></button>
        <div className={mobileFilter}>
          <div className="title">Количество пересадок</div>
          <form className="checkboxes">
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
          </form>
          <button onClick={this.getRequest} style={{width: 232 + 'px', marginTop: 30 + 'px'}}>Execute GET-request</button>
        </div>
        <div className="ticketsBlock">
          <div className="buttons">
            <button className="leftButton">Самый дешевый</button>
            <button className="rightButton">Самый быстрый</button>
          </div>
          <div className="tickets">
            {isLoading ? <div className="donut"></div> : tickets
            .filter((ticket) => ticket.segments[0].stops.length === 0 && ticket.segments[1].stops.length === 0)
            .slice(0, 5)
            .map((ticket) => <Ticket key={generateKey()} ticket={ticket} />)}
          </div>
        </div>
      </div>
    );
  }
}