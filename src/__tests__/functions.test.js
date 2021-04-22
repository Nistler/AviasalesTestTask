import {
  stops,
  stopsCounter,
  minutes,
  departureTime,
  price,
  getTickets,
  filtration,
  generateKey,
} from "../functions.js";

import * as tickets from "../__fixtures__/tickets.js";

test("minutes", () => {
  const min2 = 50;
  expect(minutes(1350)).toBe("22ч 30м");
  expect(minutes(50)).toBe("50м");
});

test("departure time", () => {
  const date1 = "2021-04-30T21:35:00.000Z";
  const duration1 = 940;
  const result1 = "21:35 - 13:15";

  const date2 = "2021-05-01T14:11:00.000Z";
  const duration2 = 1511;
  const result2 = "14:11 - 15:22";

  expect(departureTime(date1, duration1)).toBe(result1);
  expect(departureTime(date2, duration2)).toBe(result2);
});

test("stops", () => {
  expect(stops(["MOS", "SPB", "LND"])).toEqual("MOS, SPB, LND");
  expect(stops([])).toEqual("");
});

test("unique key", () => {
  const keyOne = generateKey();
  const keyTwo = generateKey();
  expect(keyOne).not.toBe(keyTwo);
});

test("stops counter", () => {
  expect(stopsCounter(0)).toBe("пересадок");
  expect(stopsCounter(1)).toBe("пересадка");
  expect(stopsCounter(2)).toBe("пересадки");
  expect(stopsCounter(5)).toBe("пересадок");
});

test("price", () => {
  expect(price(41692)).toBe("41 692");
});

test("get tickets", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ tickets: tickets.all, stop: true }),
    })
  );
  const result = await getTickets("url", []);

  expect(result).toEqual(tickets.all);
});

test("filtration", () => {
  const filters = {
    oneTransfer: false,
    twoTransfers: false,
    threeTransfers: false,
    without: false,
  };

  const changeFilter = (param) => ({ ...filters, ...param });

  expect(filtration(tickets.all, filters)).toEqual(tickets.all);

  expect(filtration(tickets.all, changeFilter({ oneTransfer: true }))).toEqual(
    tickets.oneTransfer
  );

  expect(filtration(tickets.all, changeFilter({ twoTransfers: true }))).toEqual(
    tickets.twoTransfers
  );

  expect(
    filtration(
      tickets.all,
      changeFilter({ oneTransfer: true, twoTransfers: true })
    )
  ).toEqual(tickets.oneAndTwoTransfers);

  expect(
    filtration(tickets.all, changeFilter({ threeTransfers: true }))
  ).toEqual(tickets.threeTransfers);

  expect(filtration(tickets.all, changeFilter({ without: true }))).toEqual(
    tickets.without
  );
});
