const timeOptions = (() => {
  const times: string[] = [];
  ['a.m.', 'p.m.'].forEach(ampm => {
    for (let hour = 0; hour < 12; hour += 1) {
      ['00', '30'].forEach(halfHour => {
        times.push(`${hour || 12}:${halfHour} ${ampm}`);
      });
    }
  });
  return times;
})();

export default timeOptions;