export function getQueryVariable(variable, defaultValue) {
  var query = window.location.search.substring(1);

  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue;
}
export function getAllQueryParams() {
  var query = window.location.search.substring(1);

  var vars = query.split("&");
  var pairs = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === "") {
      return pairs;
    }

    let value = pair[1] === "null" ? null : pair[1];
    value = pair[1] === "false" ? false : value;

    pairs = {
      ...pairs,
      [pair[0]]: value,
    };
  }
  return pairs;
}
