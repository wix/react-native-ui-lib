function eventComparator(a, b) {
  return a.start - b.start;
}

// TODO: do it properly with a format \ locale
// TODO: what can the user do beforehand
function getHeaderText(date) {
  const _date = new Date(date);
  const dd = String(_date.getDate()).padStart(2, '0');
  const mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = _date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// TODO: move this to processData
export function addHeaders(data) {
  const sortedData = data.sort(eventComparator);
  const result = [];
  let previousHeader, currentHeader;
  sortedData.forEach(event => {
    currentHeader = getHeaderText(event.start);
    if (previousHeader !== currentHeader) {
      result.push({
        type: 'Header',
        header: currentHeader,
        date: event.start
      });
      previousHeader = currentHeader;
    }
    result.push({
      type: 'Event',
      ...event
    });
  });
  return result;
}