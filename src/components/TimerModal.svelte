<script>
    import { onDestroy, onMount, tick } from "svelte";

    let {
        title,
        closeLabel = "Close modal",
        labelledBy = "timer-modal-title",
        onClose,
        children,
    } = $props();

    let panel;
    let previouslyFocusedElement;

    onMount(() => {
        previouslyFocusedElement = document.activeElement;
        document.body.classList.add("modal-open");

        tick().then(() => {
            panel?.focus();
        });
    });

    onDestroy(() => {
        document.body.classList.remove("modal-open");

        if (previouslyFocusedElement instanceof HTMLElement) {
            previouslyFocusedElement.focus();
        }
    });

    function closeModal() {
        onClose?.();
    }

    function closeFromKeyboard(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }
</script>

<svelte:window onkeydown={closeFromKeyboard} />

<div class="modal-layer">
    <button
        class="modal-backdrop"
        type="button"
        aria-label={closeLabel}
        tabindex="-1"
        onclick={closeModal}
    ></button>
    <div
        class="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabindex="-1"
        bind:this={panel}
    >
        <div class="modal-header">
            <h2 id={labelledBy}>{title}</h2>
            <button onclick={closeModal} aria-label={closeLabel} title={closeLabel}>
                <img
                    src="/icons/Close-Icon.svg"
                    alt=""
                    aria-hidden="true"
                    width="24"
                    height="24"
                />
            </button>
        </div>

        <div class="modal-content">
            {@render children?.()}
        </div>
    </div>
</div>

<style>
    :global(body.modal-open) {
        overflow: hidden;
    }

    .modal-layer {
        position: fixed;
        inset: 0;
        z-index: 100;
        display: grid;
        place-items: center;
        padding: var(--space-m);
        background-color: hsl(0 0% 0% / 0.72);
    }

    .modal-backdrop {
        position: absolute;
        inset: 0;
        border: 0;
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    .modal-panel {
        position: relative;
        z-index: 1;
        width: min(100%, 32rem);
        max-height: min(42rem, calc(100svh - var(--space-l)));
        overflow: auto;
        outline: none;
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-m);
        background-color: var(--color-neutral-800);
        box-shadow: var(--box-shadow-l);
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-m);
        padding: var(--space-m) var(--space-m) var(--space-s);
        border-bottom: 1px solid var(--color-neutral-700);
    }

    h2 {
        margin: 0;
        color: var(--color-neutral-200);
        font-size: var(--text-size-xl);
        font-weight: var(--font-weight-normal);
    }

    .modal-content {
        padding: var(--space-m);
    }

    .modal-header button {
        border: 0;
        border-radius: var(--border-radius-s);
        padding: var(--space-xs);
        background-color: transparent;
        line-height: 0;
        transition: background-color var(--transition-normal);
    }

    .modal-header button:hover,
    .modal-header button:focus-visible {
        background-color: var(--color-accent-700);
        cursor: pointer;
    }

    @media only screen and (max-width: 35rem) {
        .modal-layer {
            align-items: end;
            padding: var(--space-s);
        }

        .modal-panel {
            max-height: calc(100svh - var(--space-m));
        }
    }
</style>
