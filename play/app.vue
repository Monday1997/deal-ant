<template>
  <div>
    <daButton type="dashed" />
    <DIcon type="shengdanbingqilin" :color="color" :size="30" />
    <eaForm />
  </div>
</template>

<script setup lang="ts">
import { CIconType } from 'deal-ant'
const color = CIconType.green
</script>

<style scoped></style>
