<script>
    let {
        playSound,
        playNotification,
        onSoundChange,
        onNotificationChange,
        onTestSound,
        onTestNotification,
        onClose,
    } = $props();
</script>

<section class="section options-container margin-inline-auto">
    <div class="flex-center flex-row h2-row-container">
        <h2 class="simpler-h2 text-align-center">Options</h2>
        <button onclick={onClose} aria-label="Close options" title="Close options">
            <img
                src="/icons/Close-Icon.svg"
                alt=""
                aria-hidden="true"
                width="24"
                height="24"
            />
        </button>
    </div>

    <ul role="list">
        <li>
            <label>
                Sound:
                <select
                    value={playSound}
                    onchange={(event) => onSoundChange(event.currentTarget.value)}
                >
                    <option value="none">None</option>
                    <option value="pluck">Pluck</option>
                    <option value="clang">Clang</option>
                </select>
            </label>
            <button onclick={onTestSound} aria-label="Test sound" title="Test sound">
                <small>Test sound</small>
            </button>
        </li>
        <li>
            <label>
                Send Notification
                <input
                    type="checkbox"
                    checked={playNotification}
                    onchange={(event) =>
                        onNotificationChange(event.currentTarget.checked)}
                />
            </label>
            <button
                onclick={onTestNotification}
                aria-label="Test notification"
                title="Test notification"
            >
                <small>Test notification</small>
            </button>
        </li>
    </ul>
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
    .options-container {
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: 450px;
        width: 100%;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-2xs);
    }
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-s);
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
