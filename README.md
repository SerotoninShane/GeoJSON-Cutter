# GeoJSON Polygon Hole Subtraction Tool

A Node.js script that processes GeoJSON polygons by subtracting "hole" polygons from a main polygon. This is useful for creating complex polygon shapes with cutouts for use in eCanvasser or other mapping applications.

## What This Script Does

The script takes a GeoJSON file containing multiple polygon features and:
1. Uses the **first polygon** as the main shape
2. Subtracts all **subsequent polygons** as holes from the main polygon
3. Outputs a single polygon with all the holes cut out

This is particularly useful when you need to exclude certain areas from a larger boundary (e.g., excluding parks from a canvassing district).

## Run From Scratch (No Git, No VSC Needed)

Go to [Node.js](https://nodejs.org/en/download)
- Install Node.js on your system. When finished, verify: `node -v` & `npm -v`. Both must print version numbers.

Go to [GeoJSON-Polygon-Difference-Clipper](https://github.com/SerotoninShane/GeoJSON-Polygon-Difference-Clipper) 
- Click the green Code button → Download ZIP → “Extract All” → Take Interal Folder & Move It To Your Desktop

Open the folder in File Explorer
- Click in the address bar → type: `cmd` → press Enter & type `npm install` → press Enter (This installs everything from package.json (@turf/turf, @turf/difference, etc).)

## Input File Requirements

You need to create an `input.geojson` file in the same folder as the script with the following structure:

[geojson.io](http://geojson.io) is a great reasource to reference.

- **First feature**: Your main polygon (the base shape)
- **Subsequent features**: All polygons you want to subtract as holes

### Example input.geojson structure:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...]]]
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...]]]
      }
    }
  ]
}
```

**Important**: The order matters! The first polygon is your main shape, all others will be cut out from it.

Run the Tool
- Execute: `node index.js` in select folder's cmd line

Expected output
- Done. Output saved as `output.geojson`

You now have `output.geojson` in the same folder.

## Post-Processing for eCanvasser

After running the script:

1. Go to [geojson.io](http://geojson.io)
2. Drag and drop (or open) the `output.geojson` file
3. Verify the polygon looks correct with holes properly cut out
4. Click **Save** → **GeoJSON** to download the finalized version
5. This finalized file is now ready to upload to eCanvasser

## Troubleshooting

**"Difference returned null. Skipping this hole."**
- This means a hole polygon doesn't intersect with the main polygon
- The script will skip it and continue processing other holes

**"Cannot find module '@turf/turf'"**
- Run `npm install @turf/turf @turf/difference` in the script folder

**"Cannot find input.geojson"**
- Ensure `input.geojson` is in the same folder as `index.js`
- Check the filename spelling and case sensitivity

**Empty or invalid output**
- Check that your first polygon in `input.geojson` is the main boundary
- Verify all polygons are valid GeoJSON Polygon geometry copied from [geojson.io's](http://geojson.io) output identically

## Script Output

The script provides console output showing:
- Which feature is being processed
- Whether each subtraction succeeded
- The final polygon structure

The final result is saved to `output.geojson` in the same directory.

## Notes

- The script processes holes sequentially, so order matters if holes overlap each other
- All input polygons must be valid GeoJSON Polygon features
- The output will be a single Feature (not a FeatureCollection)
