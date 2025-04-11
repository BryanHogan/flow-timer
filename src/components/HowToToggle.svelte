<script>
  import { showHowTo } from "../stores/state.svelte.js";

  function toggleSettings() {
    showHowTo.update((open) => !open);
  }
</script>

<button onclick={toggleSettings}> How To Use </button>

<style>
  button {
    border: none;
    background-color: transparent;
    color: var(--color-neutral-500);
    text-decoration: none;
    transition: var(--transition-normal) color;
    font-weight: var(--font-weight-semi-bold);
    cursor: pointer;
    &:hover {
      color: var(--a-hover-color);
    }
  }
</style>
