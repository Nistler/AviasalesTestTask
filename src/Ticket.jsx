import React, { Component } from "react";
import * as normalize from "./functions.js";
import {
  Ticket,
  Header,
  Price,
  CompanyLogo,
  RouteInfo,
  H3,
  Details,
  DetailsBox,
} from "./styles/TicketStyles.js";

export default class Item extends Component {
  render() {
    const { ticket } = this.props;
    return (
      <Ticket>
        <Header>
          <Price>{normalize.price(ticket.price)} Р</Price>
          <CompanyLogo
            className="companyLogo"
            src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            alt="logo"
          />
        </Header>
        <RouteInfo>
          <DetailsBox>
            <H3>
              {ticket.segments[0].origin} - {ticket.segments[0].destination}
            </H3>
            <Details>
              {normalize.departureTime(
                ticket.segments[0].date,
                ticket.segments[0].duration
              )}
            </Details>
          </DetailsBox>
          <DetailsBox>
            <H3>В пути</H3>
            <Details>{normalize.minutes(ticket.segments[0].duration)}</Details>
          </DetailsBox>
          <DetailsBox>
            <H3>
              {ticket.segments[0].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[0].stops.length)}
            </H3>
            <Details>{normalize.stops(ticket.segments[0].stops)}</Details>
          </DetailsBox>
        </RouteInfo>
        <RouteInfo>
          <DetailsBox>
            <H3>
              {ticket.segments[1].origin} - {ticket.segments[1].destination}
            </H3>
            <Details>
              {normalize.departureTime(
                ticket.segments[1].date,
                ticket.segments[1].duration
              )}
            </Details>
          </DetailsBox>
          <DetailsBox>
            <H3>В пути</H3>
            <Details>{normalize.minutes(ticket.segments[1].duration)}</Details>
          </DetailsBox>
          <DetailsBox>
            <H3>
              {ticket.segments[1].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[1].stops.length)}
            </H3>
            <Details>{normalize.stops(ticket.segments[1].stops)}</Details>
          </DetailsBox>
        </RouteInfo>
      </Ticket>
    );
  }
}
