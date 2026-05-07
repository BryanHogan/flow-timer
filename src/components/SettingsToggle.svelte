<script>
    import { showOptions, showHowTo } from "../stores/state.svelte.js";

    function openSettings() {
        if (window.location.pathname !== "/") {
            window.location.href = "/?panel=options";
            return;
        }

        showHowTo.set(false);
        showOptions.update((open) => !open);
    }
</script>

<button onclick={openSettings} aria-label="Open timer options" title="Open timer options">
    <img
        src="/icons/Settings-Icon.svg"
        alt=""
        aria-hidden="true"
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
