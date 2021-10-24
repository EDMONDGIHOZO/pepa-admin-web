export default {
  methods: {
    addFeaturedItem(info) {
      this.$store.dispatch('Featureds/addFeatured', info)
    },
  },
}
