const helpers = {
  numToString: function(priceNum) {
    let price = String(priceNum);

    const match = price.match(/\.(\d{1,2})/);

    if (match) {
      let fractionalPart = match[1];

      // price number has 10's and/or 100's place
      if (fractionalPart.length < 2) {
        price += "0";
      }
    } else {
      price += ".00";
    }

    return "$" + price;
  },

  strToNum: function(priceString) {
    return Number(priceString.slice(1));
  }
};

export default helpers;
