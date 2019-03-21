Vue.component('adopted-list', {

  computed: {
    blips() {
      return this.$root.blips.ids
        .map((id) => {
          const entries = this.$root.blips.map[id];
          const adoptedEntry = entries.find(entry => entry.ring === 'Adopt');
          if (adoptedEntry === undefined) {
            return null;
          }

          console.log(adoptedEntry);

          return adoptedEntry;
        })
        .filter(entry => entry !== null);
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
            {{blip.description}}
          </td>
        </tr>
      </table>
    </div>
  `,
});
