var _ = require('underscore')._;

var url_format_string = "/:version/api/:collection/:id";
var url_instance = "/6/api/listings/3?sort=desc&limit=10"

console.log(url_parser(url_format_string, url_instance));

function url_parser(url_format_string, url_instance) {
  var parsedOutput = {};
  var [url_instance, url_params] = url_instance.split('?');

  _.each(
    url_format_string.split('/'),
    save_url_parts_to_parsed_output,
    { 
      parsedOutput: parsedOutput,
      url_instance_arr: url_instance.split('/')
    }
  );

  _.each(
    url_params.split('&'),
    save_url_params_to_parsed_output,
    {
      parsedOutput: parsedOutput
    }
  );

  return parsedOutput;
}

function save_url_parts_to_parsed_output(element, index, list) {
  if (element.charAt(0) == ':') {
    this.parsedOutput[element.substring(1)] = number_if_number(this.url_instance_arr[index]);
  }  
}

function save_url_params_to_parsed_output(element, index, list) {
  var [key, val] = element.split('=');
  if (key && val) {
    save_as_array_if_existing(this.parsedOutput, key, number_if_number(val));
  }
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
