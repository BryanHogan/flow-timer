<script>
    let {
        statusMessage,
        clockFace,
        timerActive,
        timerBegan,
        currentActiveItem,
        itemCount,
        currentTime,
        activeItemLength,
        onRedo,
        onToggle,
        onSkip,
    } = $props();

    let progressMax = $derived(Math.max(1, Number(activeItemLength || 0) * 60));
    let playPauseLabel = $derived(
        timerActive ? "Pause timer" : timerBegan ? "Resume timer" : "Start timer",
    );
</script>

<section class="section controls-container">
    <h2 class="text-align-center">
        {statusMessage}
    </h2>
    <p class="current-time text-align-center">
        {clockFace}
    </p>
    <div class="button-control-group">
        <button
            onclick={onRedo}
            disabled={!timerBegan}
            aria-label="Redo current task"
            title="Redo current task"
        >
            <img
                src="/icons/Skip-Back-Icon.svg"
                alt=""
                aria-hidden="true"
                width="24"
                height="24"
            />
        </button>
        <button
            onclick={onToggle}
            class={timerBegan ? "" : "glow"}
            aria-label={playPauseLabel}
            title={playPauseLabel}
        >
            {#if timerActive}
                <img
                    src="/icons/Pause-Icon.svg"
                    alt=""
                    aria-hidden="true"
                    width="24"
                    height="24"
                />
            {:else}
                <img
                    src="/icons/Play-Icon.svg"
                    alt=""
                    aria-hidden="true"
                    width="24"
                    height="24"
                />
            {/if}
        </button>
        <button
            onclick={onSkip}
            disabled={!timerBegan}
            aria-label="Skip to next task"
            title="Skip to next task"
        >
            <img
                src="/icons/Skip-Icon.svg"
                alt=""
                aria-hidden="true"
                width="24"
                height="24"
            />
        </button>
    </div>
    <p class="text-align-center status-detail">
        {#if timerBegan}
            {currentActiveItem + 1} / {itemCount}
        {:else}
            Click play to start timer.
        {/if}
    </p>
    <progress max={progressMax} value={Math.min(currentTime, progressMax)}>
        {currentTime} / {progressMax}
    </progress>
</section>

<style>
    .section {
        margin-top: var(--space-l);
    }
    .controls-container {
        background-color: var(--color-neutral-800);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: 80%;
        width: 100%;
        margin-inline: auto;
        transition: all 1.2s ease;
    }
    h2 {
        margin-top: var(--space-m);
        font-size: var(--text-size-3xl);
        font-weight: var(--font-weight-normal);
    }
    .current-time {
        padding-bottom: var(--space-m);
        font-size: var(--text-size-5xl);
        font-weight: var(--font-weight-bold);
    }
    .button-control-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-m);
    }
    .status-detail {
        margin-top: var(--space-m);
    }
    button {
        background-color: transparent;
        padding: var(--space-xs);
        border: 0;
        border-radius: var(--border-radius-s);
        transition: background-color var(--transition-normal);
        &:hover:not(:disabled) {
            background-color: var(--color-accent-700);
            cursor: pointer;
        }
        &:disabled {
            opacity: var(--opacity-weak);
            cursor: not-allowed;
        }
    }
    .glow {
        box-shadow: 0px 0px 2px 1px var(--color-accent-600);
        background-color: var(--color-accent-800);
    }
    progress,
    progress::-webkit-progress-bar {
        width: 100%;
        background-color: var(--color-accent-500);
        background-image: linear-gradient(
            140deg,
            var(--color-accent-500),
            var(--color-accent-300),
            var(--color-accent-500)
        );
        accent-color: var(--color-neutral-800);
        border: 1px solid var(--color-neutral-800);
        height: 3px;
    }
    progress::-moz-progress-bar {
        background-color: var(--color-neutral-800);
    }
    progress::-webkit-progress-value {
        border: 1px solid var(--color-neutral-800) !important;
        border-left: none;
        box-shadow: none;
        background-color: var(--color-neutral-800);
    }
    @media only screen and (max-width: 700px) {
        .controls-container {
            max-width: 100%;
        }
    }
</style>
