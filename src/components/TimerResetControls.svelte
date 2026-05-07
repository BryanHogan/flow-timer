<script>
    let { onResetTimer, onResetAll } = $props();
</script>

<div class="section flex-center">
    <button onclick={onResetTimer} aria-label="Reset timer" title="Reset timer">
        <img
            src="/icons/Reset-Timer-Icon.svg"
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
        />
    </button>
    <button onclick={onResetAll} aria-label="Reset all tasks" title="Reset all tasks">
        <img
            src="/icons/Reset-All-Icon.svg"
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
        />
    </button>
</div>

<style>
    .section {
        margin-top: var(--space-l);
        gap: var(--space-m);
        padding-bottom: var(--space-xl);
    }
    button {
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
</style>
