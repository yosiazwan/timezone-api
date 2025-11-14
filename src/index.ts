import { Elysia, t } from "elysia";
import * as geoTz from "geo-tz";

const app = new Elysia()
  .get("/", ({ query }) => {
    const lat = Number(query.lat);
    const long = Number(query.long);

    if (isNaN(lat) || isNaN(long)) {
      return { error: "Invalid lat/lon" };
    }

    // geoTz.find returns array of possible timezones
    const tz = geoTz.find(lat, long);

    if (!tz || tz.length === 0) {
      return { error: "Timezone not found" };
    }

    return {
      latitude: lat,
      longitude: long,
      timezone: tz[0]
    };
  }, {
    query: t.Object({
      lat: t.String(),
      long: t.String(),
    }),
  })
  .listen(3000);

console.log("Server running on http://localhost:3000/");
