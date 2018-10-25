<template>
  <div class="resetBtn">
    <button @click="$emit('click')">Forget Me</button>
  </div>
</template>

<style lang="scss" scoped>
.resetBtn {
  button {
    $accent: #958796;

    display: inline-block;
    color: $accent;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    background: white;
    padding: 8px 20px;
    border: 3px solid $accent;
    border-radius: 4px;

    &:hover {
      background-color: $accent;
      color: white;
      cursor: pointer;
    }
  }
}
</style>

