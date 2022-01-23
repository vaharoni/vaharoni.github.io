// This is the Google Script that is used to enable the Sheet function to3DScatterURL.
// It is also stored in https://github.com/vaharoni/vaharoni.github.io/blob/main/3dscatter.gs

eval(UrlFetchApp.fetch('https://vaharoni.github.io/lz_string_cdn/lz-string.min.js').getContentText());
const endpoint = 'https://vaharoni.github.io/3dscatter.html';

/**
 * Generates link to 3D scatter plot of your data.
 *
 * @param {main_title} The title of the chart.
 * @param {x_axis_title} The title of the X axis.
 * @param {y_axis_title} The title of the Y axis.
 * @param {z_axis_title} The title of the Z axis.
 * @param {x_range} The range of the X values.
 * @param {y_range} The range of the Y values.
 * @param {z_range} The range of the Z values.
 * @param {labels_range} The range of the labels.
 * @param {groups_range} [optional] A range that assigns a group for each value. Each group has its own color.
 * @return URL to your unique 3D scatter plot
 * @customfunction
 */
function to3DScatterURL(main_title, x_axis_title, y_axis_title, z_axis_title, x_range, y_range, z_range, labels_range, groups_range) {

  const json = {
    x: x_range.map((x) => x[0]),
    y: y_range.map((x) => x[0]),
    z: z_range.map((x) => x[0]),
    text: labels_range.map((x) => x[0]),
    title: main_title, 
    xaxis: x_axis_title,
    yaxis: y_axis_title,    
    zaxis: z_axis_title
  }  

  if (groups_range) {
    json.groups = groups_range.map((x) => x[0])
  }

  const string = JSON.stringify(json);
  const compressed = LZString.compressToBase64(string);
  return `${endpoint}?data=${compressed}`;
}

