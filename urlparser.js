var url_format_string = "/:version/api/:collection/:id";
var url_instance = "/6/api/listings/3?sort=desc&limit=10"

console.log(url_parser(url_format_string, url_instance));

function url_parser(url_format_string, url_instance) {
  var parsedOutput = {};

  var url_format_string_arr = url_format_string.split('/');
  var url_instance_arr = url_instance.split('?');
  var url_instance_string_arr = url_instance_arr[0].split('/');

  for (x = 0; x < url_format_string_arr.length; x++) {
    if (url_format_string_arr[x].charAt(0) == ':') {
      parsedOutput[url_format_string_arr[x].substring(1)] = number_if_number(url_instance_string_arr[x])
    }
  }

  if (url_instance_arr.length > 1) {
    var arr = url_instance_arr[1].split('&');
    for (x = 0; x < arr.length; x++) {
      [key, val] = arr[x].split('=');
      if (key && val) {
        save_as_array_if_existing(parsedOutput, key, number_if_number(val));
      }
    }
  }

  return parsedOutput;
}

function number_if_number(val) {
  return isNaN(Number(val)) ? val : Number(val);
}

function save_as_array_if_existing(hash, key, val) {
  if (typeof hash[key] === 'array') {
    hash[key].push(val);
  } else if (typeof hash[key] === 'string') {
    hash[key] = [ hash[key], val ];
  } else {
    hash[key] = val;
  }
}
