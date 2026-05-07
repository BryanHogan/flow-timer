<script>
    let { onClose } = $props();
</script>

<section class="margin-inline-auto description-container section">
    <div class="flex-center flex-row h2-row-container">
        <h2 class="simpler-h2 text-align-center">
            How to use<span class="visually-hidden"> flow timer</span>
        </h2>
        <button onclick={onClose} aria-label="Close how to use" title="Close how to use">
            <img
                src="/icons/Close-Icon.svg"
                alt=""
                aria-hidden="true"
                width="24"
                height="24"
            />
        </button>
    </div>

    <div class="margin-inline-auto description-content">
        <ol>
            <li>Add items to the list. Include name and length.</li>
            <li>Press play to start flow timer.</li>
        </ol>
        <p>Learn about the benefits of time-boxing.</p>
    </div>
</section>

<style>
    .section {
        margin-top: var(--space-l);
    }
    .simpler-h2 {
        font-size: var(--text-size-xl);
        font-weight: var(--font-weight-normal);
        color: var(--color-neutral-300);
    }
    .h2-row-container {
        align-items: center;
        gap: var(--space-xs);
    }
    .description-container {
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: 450px;
        width: 100%;
    }
    .description-content {
        width: fit-content;
    }
    ol {
        padding-left: 0;
        padding-bottom: var(--space-2xs);
        list-style-position: inside;
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
