import React, { Component } from "react";
import classNames from "classnames";
import { getTickets, generateKey, filtration } from "./functions.js";
import "./App.css";
import Ticket from "./Ticket.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: null,
      ticketsForRender: null,
      isLoading: true,
      isMenuHiden: true,
      buttonsState: null,
      filters: {
        oneTransfer: false,
        twoTransfers: false,
        threeTransfers: false,
        all: false,
        without: false,
      },
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = async () => {
    this.setState({ isLoading: true });
    const responseID = await fetch(
      "https://front-test.beta.aviasales.ru/search"
    );
    const searchId = await responseID.json();
    const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`;
    const tickets = await getTickets(url, []);
    console.log(tickets);
    this.setState({
      tickets,
      ticketsForRender: tickets.slice(0, 5),
      isLoading: false,
    });
  };

  toggleMenu = () => {
    const { isMenuHiden } = this.state;
    this.setState({ isMenuHiden: !isMenuHiden });
  };

  handleCheckbox = ({ target }) => {
    const { filters, tickets } = this.state;
    let newFilter;
    if (target.id === "all") {
      filters.all
        ? (newFilter = {
            all: false,
            without: false,
            oneTransfer: false,
            twoTransfers: false,
            threeTransfers: false,
          })
        : (newFilter = {
            all: true,
            without: true,
            oneTransfer: true,
            twoTransfers: true,
            threeTransfers: true,
          });
    } else {
      newFilter = { all: false, [target.id]: !filters[target.id] };
    }
    const filtered = filtration(tickets, { ...filters, ...newFilter });
    this.setState({
      filters: { ...filters, ...newFilter },
      ticketsForRender: filtered,
      buttonsState: null,
    });
  };

  handleSort = ({ target }) => {
    const { tickets, filters, buttonsState } = this.state;
    if (buttonsState === target.id) {
      this.setState({
        buttonsState: null,
        ticketsForRender: tickets.slice(0, 5),
      });
      return;
    }
    const newTickets = [...tickets];
    const sorted =
      target.id === "cheapest"
        ? newTickets.sort((a, b) => a.price - b.price)
        : newTickets.sort(
            (a, b) => a.segments[0].duration - b.segments[0].duration
          );
    const filtered = filtration(sorted, filters);
    const newButtonsState = target.id === "cheapest" ? "cheapest" : "fastest";
    this.setState({
      ticketsForRender: filtered,
      buttonsState: newButtonsState,
    });
  };

  render() {
    const {
      ticketsForRender,
      isLoading,
      isMenuHiden,
      filters,
      buttonsState,
    } = this.state;
    const mobileFilter = classNames({
      filter: true,
      mobileFilter: !isMenuHiden,
    });

    const mobileMenu = classNames({
      mobileMenu: true,
      mobileMenuOpened: !isMenuHiden,
    });

    const leftButton = classNames({
      leftButton: true,
      active: buttonsState === "cheapest",
    });

    const rightButton = classNames({
      rightButton: true,
      active: buttonsState === "fastest",
    });
    return (
      <div id="container">
        <button className={mobileMenu} onClick={this.toggleMenu}></button>
        <div className={mobileFilter}>
          <div className="title">Количество пересадок</div>
          <form className="checkboxes">
            <div className="checkboxField">
              <input
                id="all"
                type="checkbox"
                checked={filters.all}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="all">Все</label>
            </div>
            <div className="checkboxField">
              <input
                id="without"
                type="checkbox"
                checked={filters.without}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="without">Без пересадок</label>
            </div>
            <div className="checkboxField">
              <input
                id="oneTransfer"
                type="checkbox"
                checked={filters.oneTransfer}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="oneTransfer">1 пересадка</label>
            </div>
            <div className="checkboxField">
              <input
                id="twoTransfers"
                type="checkbox"
                checked={filters.twoTransfers}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="twoTransfers">2 пересадки</label>
            </div>
            <div className="checkboxField">
              <input
                id="threeTransfers"
                type="checkbox"
                checked={filters.threeTransfers}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="threeTransfers">3 пересадки</label>
            </div>
          </form>
        </div>
        <div className="ticketsBlock">
          <div className="buttons">
            <button
              id="cheapest"
              className={leftButton}
              onClick={this.handleSort}
            >
              Самый дешевый
            </button>
            <button
              id="fastest"
              className={rightButton}
              onClick={this.handleSort}
            >
              Самый быстрый
            </button>
          </div>
          <div className="tickets">
            {isLoading ? (
              <div className="donut"></div>
            ) : (
              ticketsForRender.map((ticket) => (
                <Ticket key={generateKey()} ticket={ticket} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
