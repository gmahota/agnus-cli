const axios = require("axios");
const config = require("../config/config.json");

const baseDomain = config.url; // API for products

const customHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${config.apiKey}`,
};

const baseUrl = `${baseDomain}`;

const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};

const requestClient = () => {
  // @todo: is it ok to turn redirects off here?
  // if we don't we get an error every time http tries to redirect to https
  return axios.create({
    baseUrl,
    headers: customHeaders,
  });
};

module.exports = {
  baseUrl,
  requestClient,
};
