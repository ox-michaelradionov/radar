import './components/AdoptedList.js';

const app = new Vue({
  el: '#app',

  data: {
    radars: {
      ids: [],
      map: {},
    },
    blips: {
      ids: [],
      map: {},
    },
  },

  async mounted() {
    const response = await fetch('data.json');
    const data = await response.json();

    const radarsIds = [];
    const radarsMap = {};

    const blipsIds = [];
    const blipsMap = {};

    data.forEach((radar) => {
      const { blips, ...restRadar } = radar;

      radarsIds.push(radar.id);
      radarsMap[radar.id] = restRadar;

      blips.forEach((blip, index) => {
        const {
          radarId,
          ...restBlip
        } = blip;

        blip.index = radarId || index;

        if (blipsMap[blip.id] === undefined) {
          blipsIds.push(blip.id);
          blipsMap[blip.id] = [];
        }

        blipsMap[blip.id].push(blip);
      });
    });

    this.radars.ids = radarsIds;
    this.radars.map = radarsMap;

    this.blips.ids = blipsIds;
    this.blips.map = blipsMap;
  },

});
