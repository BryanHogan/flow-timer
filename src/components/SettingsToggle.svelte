<script>
    import { showOptions } from "../stores/state.svelte.js";

    function toggleSettings() {
        showOptions.update((open) => !open);
    }
</script>

<button onclick={toggleSettings}>
    <img
        src="/icons/Settings-Icon.svg"
        alt="Close Icon"
        width="24"
        height="24"
    />
</button>

<style>
    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: var(--space-2xs);
        border-radius: var(--border-radius-s);
        &:hover {
            background-color: var(--color-accent-700);
        }
    }
</style>
