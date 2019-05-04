import { moment } from '../utils';
import { StaticMonthly } from "../Periodicity";

describe('StaticMonthly Periodicity', () => {
  let periodicity;

  describe('currentPeriod', () => {
    beforeEach(() => {
      periodicity = new StaticMonthly([10, 20]);
    });

    it('Should have the right current period ', () => {
      let period = periodicity.currentPeriod(moment("2019-03-15"))

      expect(period).toBePeriod(moment("2019-03-10"), moment("2019-03-20"));
    });

    it('Should have the right current period in the last part of the month ', () => {
      let period = periodicity.currentPeriod(moment("2019-03-25"))

      expect(period).toBePeriod(moment("2019-03-20"), moment("2019-04-10"));
    });

    it('Should have the right current period in the first part of the month ', () => {
      let period = periodicity.currentPeriod(moment("2019-03-05"))

      expect(period).toBePeriod(moment("2019-02-20"), moment("2019-03-10"));
    });

    it('Should have the right first period of the month if the date is on a period day', () => {
      let period = periodicity.currentPeriod(moment("2019-03-10"))

      expect(period).toBePeriod(moment("2019-03-10"), moment("2019-03-20"));
    });
  });

  describe('futurePeriods', () => {
    it('Should yield starting from the next period', () => {
      periodicity = new StaticMonthly([10, 20]);
      let periods = periodicity.futurePeriods(moment("2019-03-15"));

      expect(periods.next().value).toBePeriod(moment("2019-03-20"), moment("2019-04-10"));
      expect(periods.next().value).toBePeriod(moment("2019-04-10"), moment("2019-04-20"));
      expect(periods.next().value).toBePeriod(moment("2019-04-20"), moment("2019-05-10"));
    });

    it('Should handle first of the month', () => {
      periodicity = new StaticMonthly([1, 15]);
      let periods = periodicity.futurePeriods(moment("2019-03-01"));

      expect(periods.next().value).toBePeriod(moment("2019-03-15"), moment("2019-04-01"));
      expect(periods.next().value).toBePeriod(moment("2019-04-01"), moment("2019-04-15"));
      expect(periods.next().value).toBePeriod(moment("2019-04-15"), moment("2019-05-01"));
    });

    it('Should not modify given instances', () => {
      periodicity = new StaticMonthly([1, 15]);

      let periods = [];
      for (let period of periodicity.futurePeriods(moment("2019-03-01"))) {
        periods.push(period);
        if (periods.length === 3) break;
      }

      expect(periods[0]).toBePeriod(moment("2019-03-15"), moment("2019-04-01"));
      expect(periods[1]).toBePeriod(moment("2019-04-01"), moment("2019-04-15"));
      expect(periods[2]).toBePeriod(moment("2019-04-15"), moment("2019-05-01"));
    });
  });

  describe('pastPeriods', () => {
    it('Should yield starting from the next period', () => {
      periodicity = new StaticMonthly([10, 20]);
      let periods = periodicity.pastPeriods(moment("2019-03-15"));

      expect(periods.next().value).toBePeriod(moment("2019-02-20"), moment("2019-03-10"));
      expect(periods.next().value).toBePeriod(moment("2019-02-10"), moment("2019-02-20"));
      expect(periods.next().value).toBePeriod(moment("2019-01-20"), moment("2019-02-10"));
    });

    it('Should handle first of the month', () => {
      periodicity = new StaticMonthly([1, 15]);
      let periods = periodicity.pastPeriods(moment("2019-02-01"));

      expect(periods.next().value).toBePeriod(moment("2019-01-15"), moment("2019-02-01"));
      expect(periods.next().value).toBePeriod(moment("2019-01-01"), moment("2019-01-15"));
      expect(periods.next().value).toBePeriod(moment("2018-12-15"), moment("2019-01-01"));
    });

    it('Should not modify given instances', () => {
      periodicity = new StaticMonthly([1, 15]);

      let periods = [];
      for (let period of periodicity.pastPeriods(moment("2019-02-01"))) {
        periods.push(period);
        if (periods.length === 3) break;
      }

      expect(periods[0]).toBePeriod(moment("2019-01-15"), moment("2019-02-01"));
      expect(periods[1]).toBePeriod(moment("2019-01-01"), moment("2019-01-15"));
      expect(periods[2]).toBePeriod(moment("2018-12-15"), moment("2019-01-01"));
    });
  });
});

expect.extend({
  toBePeriod(actual, expectedStart, expectedEnd) {
    return {
      pass: actual.start.isSame(expectedStart) && actual.end.isSame(expectedEnd),
      message: () => `Expected \n` +
                     `   ${actual.start.format()} - ${actual.end.format()}\n` +
                     `to be\n` +
                     `   ${expectedStart.format()} - ${expectedEnd.format()}`,
    };
  },
});