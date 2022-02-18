function minutesToHour(min) {
    let newMin = min % 60 ? min % 60 : "00";
    let newHour = (min - newMin) / 60;
  
    return newHour + ":" + newMin;
  }
  function randomString(length) {
    var result = Array(length)
      .fill(0)
      .map((x) => Math.random().toString(32).charAt(2))
      .join("");
    return result;
  }


  module.exports = {
    randomString,
    minutesToHour
  };
  