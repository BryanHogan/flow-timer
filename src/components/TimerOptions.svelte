<script>
    let {
        playSound,
        playNotification,
        onSoundChange,
        onNotificationChange,
        onTestSound,
        onTestNotification,
    } = $props();
</script>

<div class="options-container">
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
</div>

<style>
    ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-s);
    }

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-s);
    }

    label {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        color: var(--color-neutral-300);
    }

    select,
    input {
        accent-color: var(--color-accent-500);
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

    @media only screen and (max-width: 35rem) {
        li {
            align-items: flex-start;
            flex-direction: column;
        }
    }
</style>
