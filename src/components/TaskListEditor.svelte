<script>
    let { itemList, timerBegan, onNameChange, onLengthChange } = $props();
</script>

<section class="margin-inline-auto section">
    <h2 class="simpler-h2 text-align-center visually-hidden">Input area</h2>
    <div class="input-container">
        <div class="input-description">
            <p class="name">Name</p>
            <p class="length">Length (min)</p>
        </div>
        <ul role="list">
            {#each itemList as item, index (index)}
                <li class="item-input-row" role="listitem">
                    <input
                        type="text"
                        value={item.name}
                        class="name-input"
                        disabled={timerBegan}
                        aria-label={`Task ${index + 1} name`}
                        oninput={(event) =>
                            onNameChange(index, event.currentTarget.value)}
                    />
                    <input
                        type="number"
                        value={item.length ?? ""}
                        min="1"
                        step="1"
                        class="length-input"
                        disabled={timerBegan}
                        aria-label={`Task ${index + 1} length in minutes`}
                        oninput={(event) =>
                            onLengthChange(
                                index,
                                event.currentTarget.value === ""
                                    ? null
                                    : Number(event.currentTarget.value),
                            )}
                    />
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    .section {
        margin-top: var(--space-l);
        width: 100%;
    }
    .simpler-h2 {
        font-size: var(--text-size-xl);
        font-weight: var(--font-weight-regular);
        color: var(--color-neutral-300);
    }
    .input-container {
        width: 100%;
        max-width: calc(28rem + var(--space-xs));
        margin-inline: auto;
    }
    ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-m);
    }
    .item-input-row,
    .input-description {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 6rem;
        gap: var(--space-xs);
        width: 100%;
    }
    input {
        min-width: 0;
        width: 100%;
        background-color: var(--color-accent-800);
        border: 1px solid transparent;
        padding: 0.25rem;
        border-radius: 2px;
        &:focus {
            background-color: var(--color-accent-700);
        }
    }
    .input-description {
        padding-bottom: var(--space-s);
    }
</style>
