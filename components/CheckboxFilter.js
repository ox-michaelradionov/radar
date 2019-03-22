Vue.component('checkbox-filter', {

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    checked: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'Filter',
    },
  },

  methods: {
    handleChange(option) {
      const nextChecked = this.checked.slice();

      const index = nextChecked.indexOf(option.value);
      if (index === -1) {
        nextChecked.push(option.value);
      } else {
        nextChecked.splice(index, 1);
      }

      this.$emit('change', nextChecked);
    },
    handleAll() {
      const nextChecked = this.options.map(option => option.value);
      this.$emit('change', nextChecked);
    },
    handleNone() {
      const nextChecked = [];
      this.$emit('change', nextChecked);
    },
  },

  template: `
    <div class="checkbox-filter">
      {{title}}
      (
      <button @click="handleAll">
        All
      </button>
      |
      <button @click="handleNone">
        None
      </button>
      )
      :
      <label
        v-for="option in options"
      >
        <input
          type="checkbox"
          @change="handleChange(option)"
          :checked="checked.includes(option.value)"
        />
        {{option.title}}
      </label>
    </div>
  `,
});
