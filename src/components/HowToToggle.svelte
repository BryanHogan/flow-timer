<script>
  import { showHowTo, showOptions } from "../stores/state.svelte.js";

  function openHowTo() {
    if (window.location.pathname !== "/") {
      window.location.href = "/?panel=how-to";
      return;
    }

    showOptions.set(false);
    showHowTo.update((open) => !open);
  }
</script>

<button onclick={openHowTo} title="How to use Flow Timer">How To Use</button>

<style>
  button {
    border: none;
    background-color: transparent;
    color: var(--color-neutral-500);
    text-decoration: none;
    transition: var(--transition-normal) color;
    font-weight: var(--font-weight-semi-bold);
    cursor: pointer;
    padding-inline: 4px;
    &:hover {
      color: var(--a-hover-color);
    }
  }
</style>
