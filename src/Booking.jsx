import React, { Component } from "react";
import { getTickets, generateKey, filtration } from "./functions.js";
import Ticket from "./Ticket.jsx";
import aviasalesLogo from "./logo.svg";
import {
  Aviasales,
  Logo,
  Title,
  Container,
  Label,
  TicketsBlock,
  Tickets,
  Buttons,
  Loader,
  CheckboxField,
  RightButton,
  LeftButton,
  FilterBox,
  MobileMenu,
  CustomCheckbox,
} from "./styles/BookingStyles.js";

export default class Booking extends Component {
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
    try {
      const responseID = await fetch(
        "https://front-test.beta.aviasales.ru/search"
      );
      console.log(responseID);
      const searchId = await responseID.json();
      const url = `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`;
      const tickets = await getTickets(url, []);
      console.log(tickets);
      this.setState({
        tickets,
        ticketsForRender: tickets.slice(0, 5),
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  toggleMenu = () => {
    const { isMenuHiden } = this.state;
    this.setState({ isMenuHiden: !isMenuHiden });
  };

  handleCheckbox = ({ target }) => {
    const { filters, tickets } = this.state;
    if (tickets === null) {
      return;
    }
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
    if (tickets === null) {
      return;
    }
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
    return (
      <Aviasales>
        <Logo src={aviasalesLogo} alt="Авиасейлс" className="logo" />
        <Container>
          <MobileMenu isHidden={isMenuHiden} onClick={this.toggleMenu} />
          <FilterBox isHidden={isMenuHiden}>
            <Title>Количество пересадок</Title>
            <form>
              <CheckboxField disabled={ticketsForRender === null}>
                <CustomCheckbox
                  id="all"
                  type="checkbox"
                  checked={filters.all}
                  onChange={this.handleCheckbox}
                />
                <Label htmlFor="all">Все</Label>
              </CheckboxField>
              <CheckboxField CheckboxField disabled={ticketsForRender === null}>
                <CustomCheckbox
                  id="without"
                  type="checkbox"
                  checked={filters.without}
                  onChange={this.handleCheckbox}
                />
                <Label htmlFor="without">Без пересадок</Label>
              </CheckboxField>
              <CheckboxField CheckboxField disabled={ticketsForRender === null}>
                <CustomCheckbox
                  id="oneTransfer"
                  type="checkbox"
                  checked={filters.oneTransfer}
                  onChange={this.handleCheckbox}
                />
                <Label htmlFor="oneTransfer">1 пересадка</Label>
              </CheckboxField>
              <CheckboxField CheckboxField disabled={ticketsForRender === null}>
                <CustomCheckbox
                  id="twoTransfers"
                  type="checkbox"
                  checked={filters.twoTransfers}
                  onChange={this.handleCheckbox}
                />
                <Label htmlFor="twoTransfers">2 пересадки</Label>
              </CheckboxField>
              <CheckboxField CheckboxField disabled={ticketsForRender === null}>
                <CustomCheckbox
                  id="threeTransfers"
                  type="checkbox"
                  checked={filters.threeTransfers}
                  onChange={this.handleCheckbox}
                />
                <Label htmlFor="threeTransfers">3 пересадки</Label>
              </CheckboxField>
            </form>
          </FilterBox>
          <TicketsBlock>
            <Buttons>
              <LeftButton
                id="cheapest"
                active={buttonsState}
                onClick={this.handleSort}
                disabled={ticketsForRender === null}
              >
                Самый дешевый
              </LeftButton>
              <RightButton
                id="fastest"
                active={buttonsState}
                onClick={this.handleSort}
                disabled={ticketsForRender === null}
              >
                Самый быстрый
              </RightButton>
            </Buttons>
            <Tickets>
              {isLoading ? (
                <Loader />
              ) : (
                ticketsForRender.map((ticket) => (
                  <Ticket key={generateKey()} ticket={ticket} />
                ))
              )}
            </Tickets>
          </TicketsBlock>
        </Container>
      </Aviasales>
    );
  }
}
