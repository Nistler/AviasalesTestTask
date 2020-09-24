import React, { Component } from "react";
import * as normalize from "./functions.js";
import * as S from "./TicketStyles.js";
//import "./Ticket.css";

export default class Item extends Component {
  render() {
    const { ticket } = this.props;
    return (
      <S.Ticket>
        <S.Header>
          <S.Price>{normalize.price(ticket.price)} Р</S.Price>
          <S.CompanyLogo
            className="companyLogo"
            src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            alt="logo"
          />
        </S.Header>
        <S.RouteInfo>
          <S.DetailsBox>
            <S.H3>
              {ticket.segments[0].origin} - {ticket.segments[0].destination}
            </S.H3>
            <S.Details>
              {normalize.departureTime(
                ticket.segments[0].date,
                ticket.segments[0].duration
              )}
            </S.Details>
          </S.DetailsBox>
          <S.DetailsBox>
            <S.H3>В пути</S.H3>
            <S.Details>
              {normalize.minutes(ticket.segments[0].duration)}
            </S.Details>
          </S.DetailsBox>
          <S.DetailsBox>
            <S.H3>
              {ticket.segments[0].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[0].stops.length)}
            </S.H3>
            <S.Details>{normalize.stops(ticket.segments[0].stops)}</S.Details>
          </S.DetailsBox>
        </S.RouteInfo>
        <S.RouteInfo>
          <S.DetailsBox>
            <S.H3>
              {ticket.segments[1].origin} - {ticket.segments[1].destination}
            </S.H3>
            <S.Details>
              {normalize.departureTime(
                ticket.segments[1].date,
                ticket.segments[1].duration
              )}
            </S.Details>
          </S.DetailsBox>
          <S.DetailsBox>
            <S.H3>В пути</S.H3>
            <S.Details>
              {normalize.minutes(ticket.segments[1].duration)}
            </S.Details>
          </S.DetailsBox>
          <S.DetailsBox>
            <S.H3>
              {ticket.segments[1].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[1].stops.length)}
            </S.H3>
            <S.Details>{normalize.stops(ticket.segments[1].stops)}</S.Details>
          </S.DetailsBox>
        </S.RouteInfo>
      </S.Ticket>
    );
  }
}
