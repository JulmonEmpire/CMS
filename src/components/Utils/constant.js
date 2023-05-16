const Primary = '#6C526F'
const PrimaryG = '#AE89A5'

const text = '#595659'


export function last30Days() {
  const now = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - 29 + i);
    return date.toISOString().slice(5, 10);
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

export function countLast24Hours(data, selectorType, type) {
  const counts = Array.from({ length: 24 }, (_, i) => {
    const hourStart = new Date();
    hourStart.setHours(hourStart.getHours() - 23 + i);
    hourStart.setMinutes(0);
    hourStart.setSeconds(0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    hourEnd.setMinutes(0);
    hourEnd.setSeconds(0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= hourStart && createdAt < hourEnd;
    }).length;
  });
  return counts;
}

export function countLast7Days(data, selectorType, type) {
  const counts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
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

export function countLast30Days(data, selectorType, type) {
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

export function countLast24HoursGender(data, selectorType, type) {
  const maleCounts = Array.from({ length: 24 }, (_, i) => {
    const hourStart = new Date();
    hourStart.setHours(hourStart.getHours() - 23 + i);
    hourStart.setMinutes(0);
    hourStart.setSeconds(0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    hourEnd.setMinutes(0);
    hourEnd.setSeconds(0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return obj.gender === "Male" && createdAt >= hourStart && createdAt < hourEnd;
    }).length;
  });

  const femaleCounts = Array.from({ length: 24 }, (_, i) => {
    const hourStart = new Date();
    hourStart.setHours(hourStart.getHours() - 23 + i);
    hourStart.setMinutes(0);
    hourStart.setSeconds(0);
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    hourEnd.setMinutes(0);
    hourEnd.setSeconds(0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return obj.gender === "Female" && createdAt >= hourStart && createdAt < hourEnd;
    }).length;
  });

  if (type === "Male") {
    return maleCounts
  } else if (type === "Female") {
    return femaleCounts
  }
}

export function countLast7DaysGender(data, selectorType, type) {
  const maleCounts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay && obj.gender === "Male";
    }).length;
  });

  const femaleCounts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay && obj.gender === "Female";
    }).length;
  });

  if (type === "Male") {
    return maleCounts
  } else if (type === "Female") {
    return femaleCounts
  }
}

export function countLast30DaysGender(data, selectorType, type) {
  const maleCounts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      const gender = obj.gender;
      return createdAt >= startOfDay && createdAt < endOfDay && gender === "Male";
    }).length;
  });

  const femaleCounts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      const gender = obj.gender;
      return createdAt >= startOfDay && createdAt < endOfDay && gender === "Female";
    }).length;
  });

  if (type === "Male") {
    return maleCounts
  } else if (type === "Female") {
    return femaleCounts
  }
}


export function countLast24HoursAge(data, selectorType, type) {
  const childCounts = Array.from({ length: 24 }, (_, i) => 0);
  const adultCounts = Array.from({ length: 24 }, (_, i) => 0);
  const elderlyCounts = Array.from({ length: 24 }, (_, i) => 0);

  const hourStart = new Date();
  hourStart.setHours(hourStart.getHours() - 23);
  hourStart.setMinutes(0);
  hourStart.setSeconds(0);

  for (let i = 0; i < 24; i++) {
    const hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);

    data.forEach(obj => {
      const createdAt = new Date(obj.createdAt);
      if (createdAt >= hourStart && createdAt < hourEnd) {
        if (obj.age < 18) {
          childCounts[i]++;
        } else if (obj.age >= 18 && obj.age <= 60) {
          adultCounts[i]++;
        } else {
          elderlyCounts[i]++;
        }
      }
    });

    hourStart.setHours(hourStart.getHours() + 1);
  }

  console.log({ childCounts, adultCounts, elderlyCounts });

  if (type === "Child") {
    return childCounts
  } else if (type === "Adult") {
    return adultCounts
  } else if (type === "Elderly") {
    return elderlyCounts
  }
}


export function countLast7DaysAge(data, selectorType, type) {
  const childCounts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay && obj.age < 18;
    }).length;
  });

  const adultCounts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay && obj.age >= 18 && obj.age <= 60;
    }).length;
  });

  const elderlyCounts = Array.from({ length: 7 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 6 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return createdAt >= startOfDay && createdAt < endOfDay && obj.age > 60;
    }).length;
  });

  if (type === "Child") {
    return childCounts;
  } else if (type === "Adult") {
    return adultCounts;
  } else if (type === "Elderly") {
    return elderlyCounts;
  }
}

export function countLast30DaysAge(data, selectorType, type) {
  const childCounts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return obj.age < 18 && createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
  });

  const adultCounts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return obj.age >= 18 && obj.age <= 60 && createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
  });

  const elderlyCounts = Array.from({ length: 30 }, (_, i) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() - 29 + i);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    endOfDay.setHours(0, 0, 0, 0);
    return data.filter(obj => {
      const createdAt = new Date(obj.createdAt);
      return obj.age > 60 && createdAt >= startOfDay && createdAt < endOfDay;
    }).length;
  });

  if (type === "Child") {
    return childCounts;
  } else if (type === "Adult") {
    return adultCounts;
  } else if (type === "Elderly") {
    return elderlyCounts;
  }
}

export function therapyType24hours(data, selectorType, type) {
  const individual = Array.from({ length: 24 }, (_, i) => 0);
  const couple = Array.from({ length: 24 }, (_, i) => 0);
  const child = Array.from({ length: 24 }, (_, i) => 0);
  const family = Array.from({ length: 24 }, (_, i) => 0);
  const group = Array.from({ length: 24 }, (_, i) => 0);

  const hourStart = new Date();
  hourStart.setHours(hourStart.getHours() - 23);
  hourStart.setMinutes(0);
  hourStart.setSeconds(0);
  let st=hourStart.getTime();

  for (let i = 0; i < 24; i++) {
    let hourEnd = new Date(hourStart);
    hourEnd.setHours(hourEnd.getHours() + 1);
    hourEnd=hourEnd.getTime();


    data?.forEach(patient => {
      patient?.notes?.forEach(note => {
        let createdAt = new Date(note?.dateOfConsultation);
        createdAt=createdAt.getTime()

        if (createdAt >= st && createdAt < hourEnd) {
          if (note.therapyType === "Individual Therapy") {
            individual[i]++;
          } else if (note.therapyType === "Couple Therapy") {
            couple[i]++;
          } else if (note.therapyType === "Child Therapy") {
            child[i]++;
          } else if (note.therapyType === "Family Therapy") {
            family[i]++;
          } else if (note.therapyType === "Group Therapy") {
            group[i]++;
          }
        }
      });
    });

    hourStart.setHours(hourStart.getHours() + 1);
  }

  if (type === "Individual") {
    return individual;
  } else if (type === "Couple") {
    return couple;
  } else if (type === "Child") {
    return child;
  } else if (type === "Family") {
    return family;
  } else if (type === "Group") {
    return group;
  }
}

export function therapyTypeLast30Days(data, selectorType, type) {
  const individual = Array.from({ length: 30 }, (_, i) => 0);
  const couple = Array.from({ length: 30 }, (_, i) => 0);
  const child = Array.from({ length: 30 }, (_, i) => 0);
  const family = Array.from({ length: 30 }, (_, i) => 0);
  const group = Array.from({ length: 30 }, (_, i) => 0);

  const currentDate = new Date();
  let startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 29); // Subtract 29 days to get the start date (30 days ago)
  let st=startDate.getTime();
  
  for (let i = 0; i < 30; i++) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Add 1 day to get the end date (next day)

    endDate=endDate.getTime()

    data?.forEach(patient => {
      patient?.notes?.forEach(note => {
        let createdAt = new Date(note?.dateOfConsultation);
        createdAt=createdAt.getTime()
        console.log(createdAt >= st && createdAt < endDate)
        if (createdAt >= st && createdAt < endDate) {
          if (note.therapyType === "Individual Therapy") {
            individual[i]++;
          } else if (note.therapyType === "Couple Therapy") {
            couple[i]++;
          } else if (note.therapyType === "Child Therapy") {
            child[i]++;
          } else if (note.therapyType === "Family Therapy") {
            family[i]++;
          } else if (note.therapyType === "Group Therapy") {
            group[i]++;
          }
        }
      });
    });

    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }

  if (type === "Individual") {
    return individual;
  } else if (type === "Couple") {
    return couple;
  } else if (type === "Child") {
    return child;
  } else if (type === "Family") {
    return family;
  } else if (type === "Group") {
    return group;
  }
}

export function therapyTypeLast7Days(data, selectorType, type) {
  const individual = Array.from({ length: 7 }, (_, i) => 0);
  const couple = Array.from({ length: 7 }, (_, i) => 0);
  const child = Array.from({ length: 7 }, (_, i) => 0);
  const family = Array.from({ length: 7 }, (_, i) => 0);
  const group = Array.from({ length: 7 }, (_, i) => 0);

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 6); // Subtract 6 days to get the start date (7 days ago)
  startDate.setHours(0, 0, 0, 0); // Set the start date time to the beginning of the day
  let st=startDate.getTime();


  for (let i = 0; i < 7; i++) {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1); // Add 1 day to get the end date (next day)
    endDate=endDate.getTime()

    data?.forEach(patient => {
      patient?.notes?.forEach(note => {
        let createdAt = new Date(note?.dateOfConsultation);
        createdAt=createdAt.getTime()
        if (createdAt >= st && createdAt < endDate) {
          if (note.therapyType === "Individual Therapy") {
            individual[i]++;
          } else if (note.therapyType === "Couple Therapy") {
            couple[i]++;
          } else if (note.therapyType === "Child Therapy") {
            child[i]++;
          } else if (note.therapyType === "Family Therapy") {
            family[i]++;
          } else if (note.therapyType === "Group Therapy") {
            group[i]++;
          }
        }
      });
    });

    startDate.setDate(startDate.getDate() + 1); // Move to the next day
  }

  if (type === "Individual") {
    return individual;
  } else if (type === "Couple") {
    return couple;
  } else if (type === "Child") {
    return child;
  } else if (type === "Family") {
    return family;
  } else if (type === "Group") {
    return group;
  }
}