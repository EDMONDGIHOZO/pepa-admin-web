<template>
  <div class="detail-card">
    <div class="title-bar">
      <p>{{ title }}</p>
    </div>
    <div class="card-contents">
      <p>{{ value }}</p>
      <div class="icon-card">
        <v-icon>mdi-arrow-right</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-card',
  props: ['title', 'value', 'pathTo'],
}
</script>
