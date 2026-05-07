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

<button onclick={openSettings} title="Open timer options">Settings</button>

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
