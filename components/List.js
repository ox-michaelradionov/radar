Vue.component('list', {

  props: {
    blips: {
      type: Array,
      default: () => [],
    },
  },

  template: `
    <div>
      <div>Showing {{blips.length}} item(s)</div>
      <table class="list-table">
        <tr>
          <th>Item</th>
          <th>Quadrant</th>
          <th>Entries (Ring | Radar | Description)</th>
        </tr>
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
            <table class="entries-table">
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
