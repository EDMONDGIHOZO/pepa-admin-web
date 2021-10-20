<template>
  <div>
    <v-alert type="success" dismissible>
      {{ message }}
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'deleteAlert',
  props: ['color', 'message', 'active'],
}
</script>
