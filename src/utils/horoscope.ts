function getHoroscope(day: number, month: number) {
  if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
    return 'Goat';
  } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
    return 'Water Bearer';
  } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    return 'Fish';
  } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    return 'Ram';
  } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
    return 'Bull';
  } else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
    return 'Twins';
  } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    return 'Crab';
  } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
    return 'Lion';
  } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
    return 'Virgin';
  } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
    return 'Balance';
  } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
    return 'Scorpion';
  } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
    return 'Archer';
  }
}

export default getHoroscope;
