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

<button onclick={openHowTo} title="How to use Flow Timer">
  <svg
    class="nav-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
  <span>How To Use</span>
</button>

<style>
  button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
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
  .nav-icon {
    display: block;
  }
</style>
