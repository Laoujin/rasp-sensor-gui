import moment from 'moment';

import { groupByHours } from '../src/components/Temperature/TempLineChart.js';

const f = 'YYYY-MM-DD HH:mm';

const data = [
  {temperature: 15, measuredon: moment('2013-02-08 06:30')},
  {temperature: 16, measuredon: moment('2013-02-08 07:30')},
  {temperature: 17, measuredon: moment('2013-02-08 08:30')},
];

describe('TempLineChart groupByHours', function() {
  it('should take the average of the temps', function() {
    const result = groupByHours(data);
    expect(result[0].measuredon.format(f)).toBe('2013-02-08 06:30');
    expect(result[0].temperature).toBe(16);
  });
});