const Primary = '#6C526F'
const PrimaryG = '#AE89A5'

const text = '#595659'


export function last30Days() {
  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - 29 + i);
    return date.toISOString().slice(0, 10);
  });
  return last30Days;
}

export function last7Days() {
  const now = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - 6 + i);
    return date.toISOString().slice(0, 10);
  });
  return last7Days;
}

export function last24Hours() {
  const now = new Date();
  const last24Hours = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(now);
    date.setHours(now.getHours() - 23 + i);
    const hours = date.getHours() % 12 || 12;
    const suffix = date.getHours() < 12 ? "AM" : "PM";
    return `${hours} ${suffix}`;
  });
  return last24Hours;
}

export function countLast24Hours(data) {
  const counts = Array.from({ length: 24 }, (_, i) => {
    const hourStart = new Date();
    hourStart.setHours(hourStart.getHours() - 23 + i);
    hourStart.setMinutes(0);
    hourStart.setSeconds(0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    hourEnd.setMinutes(0);
    hourEnd.setSeconds(0);
    console.log({hourStart,hourEnd})
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= hourStart && createdAt < hourEnd;
    }).length;
  });
  return counts;
}

export function countLast7Days(data) {
  const counts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    console.log({startOfDay,endOfDay})
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
  });
  return counts;
}

export function countLast30Days(data) {
  const counts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
  });
  return counts;
}
