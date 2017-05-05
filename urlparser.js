var url_format_string = "/:version/api/:collection/:id";
var url_instance = "/6/api/listings/3?sort=desc&limit=10"

console.log(url_parser(url_format_string, url_instance));

function url_parser(url_format_string, url_instance) {
  var parsedOutput = {};

  url_format_string_arr = url_format_string.split('/');
  url_instance_arr = url_instance.split('?');
  url_instance_string_arr = url_instance_arr[0].split('/');

  for (x = 0; x < url_format_string_arr.length; x++) {
    if (url_format_string_arr[x].charAt(0) == ':') {
      var val = isNaN(Number(url_instance_string_arr[x])) ? url_instance_string_arr[x] : Number(url_instance_string_arr[x]);
      parsedOutput[url_format_string_arr[x].substring(1)] = val
    }
  }

  if (url_instance_arr.length > 1) {
    var arr = url_instance_arr[1].split('&');
    for (x = 0; x < arr.length; x++) {
      var spl = arr[x].split('=');
      var val = isNaN(Number(spl[1])) ? spl[1] : Number(spl[1]);
      if (spl.length == 2) {
        if (typeof parsedOutput[spl[0]] === 'array') {
          parsedOutput[spl[0]].push(val);
        } else if (typeof parsedOutput[spl[0]] === 'string') {
          parsedOutput[spl[0]] = [parsedOutput[spl[0]], val]
        } else {
          parsedOutput[spl[0]] = val;
        }
      }
    }
  }

  return parsedOutput;
}
