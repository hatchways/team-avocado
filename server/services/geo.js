const fetch = require("node-fetch");
const { GEO_APP_ID, GEO_APP_CODE } = process.env;
const faker = require("faker");

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                              :::
//:::  This Function Courtesy of GeoDataSource.com (C) All Rights Reserved 2018    :::
//:::  Official Web site: https://www.geodatasource.com                            :::
//:::                                                                              :::
//:::                                                                              :::
//:::  This routine calculates the distance between two points (given the          :::
//:::  latitude/longitude of those points)                                         :::
//:::                                                                              :::
//:::  Definitions:                                                                :::
//:::    South latitudes are negative, east longitudes are positive                :::
//:::                                                                              :::
//:::  Passed to function:                                                         :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)       :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)       :::
//:::    unit = the unit you desire for[0] result[0]s                              :::
//:::           where: 'M' is statute miles (default)                              :::
//:::                  'K' is kilometers                                           :::
//:::                  'N' is nautical miles                                       :::
//:::                                                                              :::
//:::                                                                              :::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports.getDistance = function(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

module.exports.getCoordinates = async function(address) {
  // Convert address string into appropriate form for URL and generate URL
  const URL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${GEO_APP_ID}&app_code=${GEO_APP_CODE}&searchtext=${address.replace(
    " ",
    "+"
  )}`;

  // Make the request and parse returned JSON
  const res = await fetch(URL).then(res => res.json());


  let result;
  try {
    result = new CoordPair(
      res.Response.View[0].Result[0].Location.MapView.TopLeft.Latitude,
      res.Response.View[0].Result[0].Location.MapView.TopLeft.Longitude
    );
  } catch (error) {
    throw Error("Invalid Address");
  }

  return result;
};

const CoordPair = function() {
  if (arguments[0] instanceof Array) {
    this.lat = Number(arguments[0][0]);
    this.lon = Number(arguments[0][1]);
  } else {
    this.lat = Number(arguments[0]);
    this.lon = Number(arguments[1]);
  }
};

CoordPair.fromGeoJsonPoint = function(geoJsonPoint) {
  const [lon, lat] = geoJsonPoint.coordinates;

  return new CoordPair(lat, lon);
};

CoordPair.prototype.get = function() {
  return [this.lat, this.lon];
};
CoordPair.prototype.toString = function() {
  return `[${this.lat}, ${this.lon}]`;
};
CoordPair.prototype.delta = function(latDelta, lonDelta) {
  return new CoordPair(this.lat + latDelta, this.lon + lonDelta);
};
CoordPair.prototype.toGeoJsonPoint = function() {
  return { type: "Point", coordinates: [this.lon, this.lat] };
};
CoordPair.prototype.getDistanceFrom = function(secondCoordPair, unit = "M") {
  const [lat1, lon1] = this.get(),
    [lat2, lon2] = secondCoordPair.get();

  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

module.exports.CoordPair = CoordPair;

module.exports.getRandomCoordPair = function() {
  return new CoordPair(faker.address.latitude(), faker.address.longitude());
};
