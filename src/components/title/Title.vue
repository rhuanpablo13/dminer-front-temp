<template>
  <h1><slot /></h1>
</template>

<style scoped>
h1 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
