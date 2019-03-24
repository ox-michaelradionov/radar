Vue.component('text-search', {

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleInput(ev) {
      this.$emit('input', ev.target.value);
    },
    handleReset() {
      this.$emit('input', '');
    },
  },

  template: `
    <div>
      <input
        type="text"
        @input="handleInput"
        :value="value"
      />
      <button
        @click="handleReset"
      >
        Reset
      </button>
    </div>
  `,
});
