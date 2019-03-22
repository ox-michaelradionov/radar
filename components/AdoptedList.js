Vue.component('adopted-list', {

  computed: {
    blips() {
      const blips = this.$root.blips.ids
        .filter((id) => {
          const entries = this.$root.blips.map[id];
          const adoptedEntry = entries.find(entry => entry.ring === 'Adopt');
          if (adoptedEntry === undefined) {
            return false;
          }
          return true;
        })
        .map((id) => {
          const entries = this.$root.blips.map[id];
          const adoptedEntry = entries.find(entry => entry.ring === 'Adopt');

          adoptedEntry.entries = entries;

          adoptedEntry.entries.sort((a, b) => {
            if (a.date > b.date) return 1;
            if (a.date < b.date) return -1;
            return 0;
          });

          return adoptedEntry;
        });

      blips.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });

      return blips;
    },
  },

  template: `
    <div>
      <h3>All adopted</h3>
      <table>
        <tr
          v-for="blip in blips"
          :key="blip.id"
        >
          <td width="15%">
            {{blip.name}}
          </td>
          <td width="10%">
            {{blip.quadrant}}
          </td>
          <td>
            <table>
              <tr
                v-for="entry in blip.entries"
              >
                <td width="10%">
                  {{entry.ring}}
                </td>
                <td width="10%">
                  {{entry.date}}
                </td>
                <td v-html="entry.description"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `,
});
