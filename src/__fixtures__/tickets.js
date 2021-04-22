const oneStop1 = {
  price: 42020,
  carrier: "TG",
  segments: [
    {
      origin: "MOW",
      destination: "HKT",
      date: "2021-05-01T13:23:00.000Z",
      stops: ["SIN"],
      duration: 1963,
    },
    {
      origin: "HKT",
      destination: "MOW",
      date: "2021-05-21T00:52:00.000Z",
      stops: ["SIN"],
      duration: 1622,
    },
  ],
};

const oneStop2 = {
  price: 83434,
  carrier: "MH",
  segments: [
    {
      origin: "MOW",
      destination: "HKT",
      date: "2021-05-01T17:53:00.000Z",
      stops: ["BKK"],
      duration: 932,
    },
    {
      origin: "HKT",
      destination: "MOW",
      date: "2021-05-21T12:55:00.000Z",
      stops: ["SIN", "BKK"],
      duration: 1204,
    },
  ],
};

const twoStops = {
  price: 56952,
  carrier: "TG",
  segments: [
    {
      origin: "MOW",
      destination: "HKT",
      date: "2021-04-30T23:01:00.000Z",
      stops: ["SIN", "AUH"],
      duration: 1098,
    },
    {
      origin: "HKT",
      destination: "MOW",
      date: "2021-05-21T11:33:00.000Z",
      stops: [],
      duration: 1201,
    },
  ],
};

const threeStops = {
  price: 51313,
  carrier: "EK",
  segments: [
    {
      origin: "MOW",
      destination: "HKT",
      date: "2021-04-30T22:30:00.000Z",
      stops: ["SIN", "IST", "DXB"],
      duration: 1922,
    },
    {
      origin: "HKT",
      destination: "MOW",
      date: "2021-05-21T07:48:00.000Z",
      stops: ["HKG", "DXB", "AUH"],
      duration: 1255,
    },
  ],
};

const withoutStops = {
  price: 92475,
  carrier: "S7",
  segments: [
    {
      origin: "MOW",
      destination: "HKT",
      date: "2021-05-01T10:07:00.000Z",
      stops: [],
      duration: 1444,
    },
    {
      origin: "HKT",
      destination: "MOW",
      date: "2021-05-21T06:57:00.000Z",
      stops: [],
      duration: 1515,
    },
  ],
};

export const all = [oneStop1, oneStop2, twoStops, threeStops, withoutStops];
export const oneTransfer = [oneStop1, oneStop2];
export const twoTransfers = [twoStops];
export const oneAndTwoTransfers = [oneStop1, oneStop2, twoStops];
export const threeTransfers = [threeStops];
export const without = [withoutStops];
