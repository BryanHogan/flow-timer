<script>
    let { onResetTimer, onResetAll } = $props();
</script>

<div class="section flex-center">
    <button onclick={onResetTimer} title="Reset timer">
        <img
            src="/icons/Reset-Timer-Icon.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
        />
        <span>Reset Timer</span>
    </button>
    <button onclick={onResetAll} title="Reset all tasks">
        <img
            src="/icons/Reset-All-Icon.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
        />
        <span>Reset Tasks</span>
    </button>
</div>

<style>
    .section {
        margin-top: var(--space-l);
        gap: var(--space-m);
        padding-bottom: var(--space-xl);
    }
    button {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2xs);
        background-color: transparent;
        padding: var(--space-xs);
        border: 0;
        border-radius: var(--border-radius-s);
        transition: background-color var(--transition-normal);
        &:hover {
            background-color: var(--color-accent-700);
            cursor: pointer;
        }
    }
    button img {
        display: block;
    }
</style>
