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

  function formatBookingsEst(bookings){
    let result = bookings.map(b => {
      return {
        id: b.id,
        details: b.details,
        startTime: b.startTime,
        endTime: b.endTime,
        payment_id: b.payment_id,
        payment_status: b.payment_status,
        courtId: b.court.id,
        courtName: b.court.name,
        courtPrice: b.court.price,
        courtSport: b.court.sport,
        siteName: b.court.site.name,
        establishmentName: b.court.site.establishment.name,
        userName: b.user.name,
        userLastName: b.user.lastName,
      }
    })
    return result
  }


  module.exports = {
    randomString,
    minutesToHour,
    formatBookingsEst
  };
  