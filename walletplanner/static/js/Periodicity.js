import { moment } from './utils';

class Periodicity {
    currentPeriod(date) {
        return this.getPeriod(date);
    }

    * pastPeriods(date) {
        let current = this.currentPeriod(date);
        while (true) {
            current = this.getPeriod(moment(current.start).add(-1, 'days'));
            yield current;
        }
    }

    * futurePeriods(date) {
        let current = this.currentPeriod(date);
        while (true) {
            current = this.getPeriod(moment(current.end).add(1, 'days'));
            yield current;
        }
    }
}

class StaticMonthly extends Periodicity {
    constructor(days) {
        super();
        this.days = days;
    }

    getPeriod(date) {
        let nextPeriodDayIndex = this._nextPeriodDayIndex(date);

        return moment.range(
            this._startDate(nextPeriodDayIndex, date),
            this._endDate(nextPeriodDayIndex, date),
        )
    }

    _nextPeriodDayIndex(date) {
        let nextPeriodDayIndex = 0;
        while (this.days[nextPeriodDayIndex] <= date.date()) {
            nextPeriodDayIndex += 1;
        }
        return nextPeriodDayIndex
    }

    _startDate(nextPeriodDayIndex, date) {
        date = moment(date);
        if (nextPeriodDayIndex === 0) {
            date.add(-1, 'month');
            date.date(this.days[this.days.length - 1])
        } else {
            date.date(this.days[nextPeriodDayIndex - 1])
        }
        return date;
    }

    _endDate(nextPeriodDayIndex, date) {
        date = moment(date);
        if (nextPeriodDayIndex >= this.days.length) {
            date.add(1, 'month')
            date.date(this.days[nextPeriodDayIndex % this.days.length])
        } else {
            date.date(this.days[nextPeriodDayIndex])
        }
        return date;
    }
}

export {
    Periodicity,
    StaticMonthly
}