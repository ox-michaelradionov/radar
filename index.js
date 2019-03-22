import './components/List.js';
import './components/CheckboxFilter.js';

import {
  QUADRANTS_OPTIONS, RINGS_OPTIONS,
  RINGS,
} from './constants.js';

const app = new Vue({
  el: '#app',

  data: {
    QUADRANTS_OPTIONS,
    RINGS_OPTIONS,

    selectedRadars: [],
    selectedQuadrants: QUADRANTS_OPTIONS.map(o => o.value),
    selectedRings: [RINGS.adopt],

    radars: [],
    blips: {
      ids: [],
      map: {},
    },
  },

  computed: {
    radarsOptions() {
      return this.radars.map((radar) => {
        const option = {
          title: radar.date,
          value: radar.date,
        };
        return option;
      });
    },
    filteredBlips() {
      const blips = this.blips.ids
        .filter((id) => {
          const entries = this.blips.map[id];

          const hasAny = entries.some((entry) => {
            return this.selectedRings.includes(entry.ring)
              && this.selectedRadars.includes(entry.date)
              && this.selectedQuadrants.includes(entry.quadrant);
          });

          return hasAny;
        })
        .map((id) => {
          const entries = this.blips.map[id];
          const firstEntry = entries[0];

          firstEntry.entries = entries;

          firstEntry.entries.sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
            return 0;
          });

          return firstEntry;
        });

      blips.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });

      return blips;
    },
  },

  async mounted() {
    const response = await fetch('data.json');
    const data = await response.json();

    const allRadars = [];

    const blipsIds = [];
    const blipsMap = {};

    data.forEach((radar) => {
      const { blips, ...restRadar } = radar;

      allRadars.push(radar);

      blips.forEach((blip, index) => {
        const {
          radarId,
          ...restBlip
        } = blip;

        blip.date = restRadar.date;
        blip.index = radarId || index;
        blip.quadrant = blip.quadrant.toLowerCase();
        blip.ring = blip.ring.toLowerCase();

        if (blipsMap[blip.id] === undefined) {
          blipsIds.push(blip.id);
          blipsMap[blip.id] = [];
        }

        blipsMap[blip.id].push(blip);
      });
    });

    allRadars.sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0;
    });

    this.radars = allRadars;

    this.selectedRadars = [allRadars[allRadars.length - 1].date];

    this.blips.ids = blipsIds;
    this.blips.map = blipsMap;
  },

});
