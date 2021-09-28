<template>
  <keep-alive>
    <router-view :key="$route.path"></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: 'DashboardWrapper',
}
</script>
