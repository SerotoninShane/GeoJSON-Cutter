import * as turf from '@turf/turf';
import difference from '@turf/difference';
import * as fs from 'fs';

// Read your GeoJSON file
const rawData = fs.readFileSync('input.geojson', 'utf8');
const geojson = JSON.parse(rawData);

// Array to hold just coordinates
const coordsArray = geojson.features.map(f => f.geometry.coordinates);

let mainPolygon = turf.polygon(coordsArray[0]); // first = main

for (let i = 1; i < coordsArray.length; i++) {
  console.log(`\n--- Processing feature ${i} ---`);
  const holePolygon = turf.polygon(coordsArray[i]);

  const diff = difference(turf.featureCollection([mainPolygon, holePolygon]));
  if (!diff) {
    console.log('Difference returned null. Skipping this hole.');
    continue;
  }

  mainPolygon = diff;
  console.log('Updated main polygon:', JSON.stringify(mainPolygon, null, 2));
}

// Save the final polygon
fs.writeFileSync('output.geojson', JSON.stringify(mainPolygon, null, 2));
console.log('\n Final polygon written to output.geojson');
