import React, { Component } from "react";
import * as normalize from "./functions.js";
import "./Ticket.css";

export default class Item extends Component {
  render() {
    const { ticket } = this.props;
    return (
      <div className="ticket">
        <div className="ticketHeader">
          <div className="price">{normalize.price(ticket.price)} Р</div>
          <img
            className="companyLogo"
            src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            alt="logo"
          />
        </div>
        <div className="routeInfo">
          <div className="route">
            <h3>
              {ticket.segments[0].origin} - {ticket.segments[0].destination}
            </h3>
            <div className="routeDetails">
              {normalize.departureTime(
                ticket.segments[0].date,
                ticket.segments[0].duration
              )}
            </div>
          </div>
          <div className="length">
            <h3>В пути</h3>
            <div className="routeDetails">
              {normalize.minutes(ticket.segments[0].duration)}
            </div>
          </div>
          <div className="stops">
            <h3>
              {ticket.segments[0].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[0].stops.length)}
            </h3>
            <div className="routeDetails">
              {normalize.stops(ticket.segments[0].stops)}
            </div>
          </div>
        </div>
        <div className="routeInfo">
          <div className="route">
            <h3>
              {ticket.segments[1].origin} - {ticket.segments[1].destination}
            </h3>
            <div className="routeDetails">
              {normalize.departureTime(
                ticket.segments[1].date,
                ticket.segments[1].duration
              )}
            </div>
          </div>
          <div className="length">
            <h3>В пути</h3>
            <div className="routeDetails">
              {normalize.minutes(ticket.segments[1].duration)}
            </div>
          </div>
          <div className="stops">
            <h3>
              {ticket.segments[1].stops.length}{" "}
              {normalize.stopsCounter(ticket.segments[1].stops.length)}
            </h3>
            <div className="routeDetails">
              {normalize.stops(ticket.segments[1].stops)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
