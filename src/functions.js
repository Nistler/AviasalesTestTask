export const minutes = (time) => {
    const minutes = time % 60;
    const hours = (time - minutes) / 60;
    const normalized = hours < 1 ? `${minutes}м` : `${hours}ч ${minutes}м`;
    return normalized;
}

export const departureTime = (date, duration) => {
    const time = new Date(Date.parse(date));
    const arrivalTime = new Date(time);
    arrivalTime.setMinutes(time.getMinutes() + duration);
    return `${time.getUTCHours()}:${time.getMinutes()} - ${arrivalTime.getUTCHours()}:${arrivalTime.getMinutes()}`;
}

export const stops = (stops) => stops.join(', ');

export const stopsCounter = (counter) => {
    if (counter === 1) {
        return 'пересадка';
    }
    if (counter > 1 && counter < 5) {
        return 'пересадки';
    }
    return 'пересадок';
}

export const price = (cost) => cost.toLocaleString('ru-RU');

export const getTickets = async (url, arr) => {
    let tickets = [];
    try {
        const response = await fetch(url);
        const responseTickets = await response.json();
        tickets = responseTickets.tickets;
        if (responseTickets.stop) {
            return [...arr, ...tickets];
        }
    } catch(err) {
        console.log(err);
        return await getTickets(url, arr);
    }
    return await getTickets(url, [...arr, ...tickets]);
}

export const generateKey = () => Math.random().toString(36).substr(2, 9);

const applyFilters = (ticket, filters) => {
    const { oneTransfer, twoTransfers, threeTransfers, without } = filters;
    if (without && ticket.segments[0].stops.length === 0) {
        return true;
    } else if (oneTransfer && ticket.segments[0].stops.length === 1) {
        return true;
    } else if (twoTransfers && ticket.segments[0].stops.length === 2) {
        return true;
    } else if (threeTransfers && ticket.segments[0].stops.length === 3) {
        return true;
    } else if (!oneTransfer && !twoTransfers && !threeTransfers && !without) {
        return true;
    }
    return false;
}

export const filtration = (tickets, filters) => {
    const filtered = tickets
      .filter((ticket) => applyFilters(ticket, filters))
      .slice(0, 5);
    return filtered;
  }