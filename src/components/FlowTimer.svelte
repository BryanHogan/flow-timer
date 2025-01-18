<script>
    /* ========================= Variables ========================= */

    let itemList = $state([
        { name: "Task 1", length: 4 },
        { name: "Task 2", length: 4 },
        { name: "", length: 8 },
    ]);
    const totalTime = $derived.by(() =>
        itemList.reduce((sum, item) => sum + item.length, 0),
    );
    let currentActiveItem = $state(0);
    const currentActiveItemName = $derived(itemList[currentActiveItem].name);

    let currentTime = $state(0);
    let totalTimePassed = $state(0);
    let timerActive = $state(false);
    let timerBegan = $state(false);
    let remainingTime = $derived(itemList[currentActiveItem].length - currentTime);

    let clockHours = $derived(Math.floor(remainingTime / 3600));
    let clockMinutes = $derived(Math.floor((remainingTime % 3600) / 60));
    let clockSeconds = $derived(remainingTime % 60);
    let clockFace = $derived(
    (clockHours > 0 ? clockHours + ":" : "") +
    (clockMinutes < 10 ? "0" : "") + clockMinutes + ":" +
    (clockSeconds < 10 ? "0" : "") + clockSeconds
);

    /* ========================= Timer Functions ========================= */

    function toggleTimer() {
        timerActive = !timerActive;
    }

    function finishTimer() {
        console.log("Finished!");
    }

    function startTimer() {
        timerActive = true;
        timerBegan = true;
        prepareList();
        countTotalTimePassed();
        currentTime = 0;
        setInterval(() => {
            if (timerActive && timerBegan) {
                currentTime = currentTime + 1;
                if (currentTime > itemList[currentActiveItem].length) {
                    goNextItem();
                }
            }
        }, 1000);
    }

    function countTotalTimePassed() {
        totalTimePassed = 0;
        setInterval(() => {
            if (timerActive && timerBegan) {
                totalTimePassed = totalTimePassed + 1;
            }
        }, 1000);
    }

    function goNextItem() {
        console.log("VICTORYYY");
        console.log(currentActiveItem);
        console.log(itemList.length);
        if (currentActiveItem < itemList.length - 1) {
            currentActiveItem = currentActiveItem + 1;
            currentTime = 0;
        } else {
            finishTimer();
        }
    }

    /* ========================= List Functions ========================= */

    function checkIfItemListFull() {
        if (timerBegan == false) {
            let itemListLength = itemList.length;
            if (
                itemList.length != 0 &&
                itemList[itemListLength - 1].name != "" &&
                itemList[itemListLength - 1].length
            ) {
                console.log("Item list full.");
                createNewInputField();
            }
        }
    }

    $effect(() => {
        checkIfItemListFull();
    });

    function prepareList() {
        itemList = itemList.filter(
            (item) => item.name !== "" && item.length > 0,
        );
        /* make array fields non adjustable*/
    }

    function createNewInputField() {
        itemList.push({ name: "", length: null });
    }

    function redoCurrent() {
        console.log(currentActiveItem);
        if (currentTime == 0 && currentActiveItem > 0) {
            currentActiveItem = currentActiveItem - 1;
        }
        currentTime = 0;
    }
</script>

<main class="base-layout">
    <h1 class="text-align-center">Flow Timer<span class="visually-hidden">- the Time-Boxing Tool</span></h1>
    <section class="margin-inline-auto description-container section">
        <h2 class="simpler-h2 text-align-center">
            How to use<span class="visually-hidden"> flow timer</span>
        </h2>
        <div>
            <ol style="padding-left: 0; list-style-position: inside;">
                <li>Add items to the list. Include name and length.</li>
                <li>Press play to start flow timer.</li>
            </ol>
            <p>Learn about the benefits of time-boxing.</p>
        </div>
    </section>
    <section class="section visually-hidden">
        <h2 class="simpler-h2 text-align-center">Options</h2>
    </section>
    <section class="controls-container">
        <h2 class="text-align-center" style="margin-top: var(--space-m);">
            {currentActiveItemName}
        </h2>
        <p class="current-time text-align-center" style="padding-bottom: var(--space-m);">{clockFace}</p>
        {#if timerBegan}
            <div class="button-control-group">
                <button onclick={redoCurrent}>
                    <img
                        src="/icons/Skip-Back-Icon.svg"
                        alt="Skip-back Icon"
                        width="24"
                        height="24"
                    />
                </button>
                <button onclick={toggleTimer}>
                    {#if timerActive}
                        <img
                            src="/icons/Pause-Icon.svg"
                            alt="Pause Icon"
                            width="24"
                            height="24"
                        />
                    {:else}
                        <img
                            src="/icons/Play-Icon.svg"
                            alt="Unpause Icon"
                            width="24"
                            height="24"
                        />
                    {/if}
                </button>
                <button onclick={goNextItem}>
                    <img
                        src="/icons/Skip-Icon.svg"
                        alt="Pause Icon"
                        width="24"
                        height="24"
                    />
                </button>
            </div>
            <p class="text-align-center" style="margin-top: var(--space-m);">
                {currentActiveItem + 1} / {itemList.length}
            </p>
            <progress min="0" max={itemList[currentActiveItem].length} value={currentTime} style="width: 100%;">{currentTime} / {itemList[currentActiveItem].length}</progress>
        {:else}
            <div class="button-control-group">
                <button
                    onclick={startTimer}
                    class="margin-inline-auto flex-center flex-column"
                    style="background-color: var(--color-neutral-700); gap: var(--space-xs);"
                >
                    <img
                        src="/icons/Play-Icon.svg"
                        alt="Unpause Icon"
                        width="24"
                        height="24"
                    />
                    <p>Start Timer</p>
                </button>
            </div>
        {/if}
    </section>
    <div class="margin-inline-auto" style="width: 100%">
        <h2 class="simpler-h2 text-align-center">Input area</h2>
        <div class="input-container" role="list">
            <div class="input-description">
                <p class="name">Name</p>
                <p class="length">Length</p>
            </div>
            <ul role="list">
                {#each itemList as item}
                    <li class="item-input-row">
                        <input
                            type="text"
                            bind:value={item.name}
                            class="name-input"
                        />
                        <input
                            type="number"
                            bind:value={item.length}
                            class="length-input"
                        />
                    </li>
                {/each}
            </ul>
        </div>
        <button onclick={checkIfItemListFull}>Check if full</button>
    </div>
    <p>Total time passed: {totalTimePassed}</p>
    <p>{totalTime}</p>
</main>

<style>
    progress, progress::-webkit-progress-bar {
        background-color: var(--color-accent-500); /* background */
        background-image: linear-gradient(
            140deg,
            var(--color-accent-500),
            var(--color-accent-300),
            var(--color-accent-500)
        );
        accent-color: var(--color-neutral-800); /* moving bar, needed? */
        border: 1px solid var(--color-neutral-800);
        height: 3px;
    }
    progress::-moz-progress-bar {
        background-color: var(--color-neutral-800); /* moving bar */
    }

    progress::-webkit-progress-value {
        border: 1px solid var(--color-neutral-800) !important;
        border-left: none;
        box-shadow: none;
        background-color: var(--color-neutral-800); /* moving bar */
    }

    .section {
        margin-top: var(--space-l);
        margin-bottom: var(--space-l);
    }
    .simpler-h2 {
        font-size: var(--text-size-xl);
        font-weight: var(--font-weight-normal);
        color: var(--color-neutral-300);
        margin-bottom: var(--space-s);
    }
    button {
        background-color: transparent;
        padding: var(--space-xs);
        border: 0;
        border-radius: var(--border-radius-s);
        transition: background-color var(--transition-normal);
        &:hover {
            background-color: var(--color-accent-800);
            cursor: pointer;
        }
    }
    .description-container {
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: fit-content;
        & div ol {
            padding-bottom: var(--space-2xs);
        }
    }
    .controls-container {
        background-color: var(--color-neutral-800);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: 80%;
        width: 100%;
        margin-inline: auto;
        transition: all 1.2s ease;
        & h2 {
            font-size: var(--text-size-3xl);
            font-weight: var(--font-weight-normal);
        }
        & .current-time {
            font-size: var(--text-size-5xl);
            font-weight: var(--font-weight-bold);
        }
        & .button-control-group {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: var(--space-m);
        }
    }

    .input-container {
        max-width: 1250px;
        margin-inline: auto;
        & ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: var(--space-l);
        }
        & .item-input-row {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: center;
            gap: var(--space-s);
            & input {
                background-color: var(--color-accent-800);
                border: 1px solid transparent;
                padding: 0.25rem;
                border-radius: 2px;
                &:focus {
                    background-color: var(--color-accent-700);
                }
            }
            & .name-input {
                width: 60%;
                max-width: 22rem;
            }
            & .length-input {
                width: 20%;
                max-width: 6rem;
            }

        }
        & .input-description {
            display: flex;
            flex-direction: row;
            justify-content: center;
            & .name {
                width: 60%;
                max-width: calc(22rem + var(--space-s));
            }
            & .length {
                width: 20%;
                max-width: 6rem;
            }
        }
    }
    @media only screen and (max-width: 700px) {
        .controls-container {
            max-width: 100%;
        }
    }
</style>
