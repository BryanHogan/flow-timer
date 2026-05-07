<script>
    let {
        playSound,
        playNotification,
        confirmNextTask,
        showTimeInTitle,
        onSoundChange,
        onNotificationChange,
        onConfirmNextChange,
        onShowTimeInTitleChange,
        onTestSound,
        onTestNotification,
    } = $props();
</script>

<div class="settings-panel">
    <section class="settings-group" aria-labelledby="settings-alerts">
        <h3 id="settings-alerts" class="eyebrow">Alerts</h3>

        <div class="settings-row">
            <label for="opt-sound">Sound</label>
            <div class="control-cluster">
                <select
                    id="opt-sound"
                    class="select"
                    value={playSound}
                    onchange={(event) => onSoundChange(event.currentTarget.value)}
                >
                    <option value="none">None</option>
                    <option value="pluck">Pluck</option>
                    <option value="clang">Clang</option>
                </select>
                <button
                    type="button"
                    class="test-button"
                    onclick={onTestSound}
                    aria-label="Test sound"
                    title="Test sound"
                >
                    Test
                </button>
            </div>
        </div>

        <div class="settings-row">
            <label for="opt-notif">Notification</label>
            <div class="control-cluster">
                <input
                    id="opt-notif"
                    type="checkbox"
                    class="switch"
                    checked={playNotification}
                    onchange={(event) =>
                        onNotificationChange(event.currentTarget.checked)}
                />
                <button
                    type="button"
                    class="test-button"
                    onclick={onTestNotification}
                    aria-label="Test notification"
                    title="Test notification"
                >
                    Test
                </button>
            </div>
        </div>
    </section>

    <section class="settings-group" aria-labelledby="settings-behavior">
        <h3 id="settings-behavior" class="eyebrow">Behavior</h3>

        <div class="settings-row">
            <label for="opt-confirm">Confirm before next task</label>
            <input
                id="opt-confirm"
                type="checkbox"
                class="switch"
                checked={confirmNextTask}
                onchange={(event) =>
                    onConfirmNextChange(event.currentTarget.checked)}
            />
        </div>

        <div class="settings-row">
            <label for="opt-title">Show time in title</label>
            <input
                id="opt-title"
                type="checkbox"
                class="switch"
                checked={showTimeInTitle}
                onchange={(event) =>
                    onShowTimeInTitleChange(event.currentTarget.checked)}
            />
        </div>
    </section>
</div>

<style>
    .settings-panel {
        display: flex;
        flex-direction: column;
        gap: var(--space-m);
    }

    .settings-group {
        display: flex;
        flex-direction: column;
    }

    .eyebrow {
        margin: 0 0 var(--space-2xs);
        color: var(--color-neutral-500);
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-semi-bold);
    }

    .settings-row {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: var(--space-m);
        padding-block: var(--space-s);
        border-bottom: 1px solid var(--color-neutral-700);
    }

    .settings-row:last-child {
        border-bottom: 0;
    }

    .settings-row label {
        color: var(--color-neutral-200);
        font-size: var(--font-size-base);
    }

    .control-cluster {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-s);
        justify-self: end;
    }

    .select {
        background-color: var(--color-neutral-900);
        color: var(--color-neutral-200);
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-s);
        padding: 0.3rem var(--space-s);
        font: inherit;
        cursor: pointer;
        transition: border-color var(--transition-normal);
    }

    .select:hover,
    .select:focus-visible {
        border-color: var(--color-accent-500);
        outline: none;
    }

    .switch {
        appearance: none;
        -webkit-appearance: none;
        width: 2.25rem;
        height: 1.25rem;
        margin: 0;
        border: 1px solid var(--color-neutral-600);
        border-radius: 999px;
        background-color: var(--color-neutral-700);
        position: relative;
        cursor: pointer;
        transition:
            background-color var(--transition-normal),
            border-color var(--transition-normal);
    }

    .switch::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;
        width: calc(1.25rem - 4px);
        height: calc(1.25rem - 4px);
        border-radius: 50%;
        background-color: var(--color-neutral-300);
        transition:
            transform var(--transition-normal),
            background-color var(--transition-normal);
    }

    .switch:checked {
        background-color: var(--color-accent-600);
        border-color: var(--color-accent-500);
    }

    .switch:checked::before {
        transform: translateX(1rem);
        background-color: var(--color-neutral-100);
    }

    .switch:focus-visible {
        outline: 2px solid var(--color-accent-500);
        outline-offset: 2px;
    }

    .test-button {
        background-color: transparent;
        border: 1px solid var(--color-neutral-700);
        color: var(--color-neutral-300);
        border-radius: var(--border-radius-s);
        padding: 0.25rem var(--space-xs);
        font-size: var(--font-size-small);
        letter-spacing: 0.04em;
        cursor: pointer;
        transition:
            color var(--transition-normal),
            border-color var(--transition-normal),
            background-color var(--transition-normal);
    }

    .test-button:hover,
    .test-button:focus-visible {
        color: var(--color-neutral-100);
        border-color: var(--color-accent-500);
        outline: none;
    }

    @media only screen and (max-width: 35rem) {
        .settings-row {
            gap: var(--space-s);
        }
    }
</style>
