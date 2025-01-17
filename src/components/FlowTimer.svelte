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
    <h1 class="text-align-center">Flow Timer</h1>
    <div>
        <h2>How to use (((description)))</h2>
    </div>
    <div>
        <h2>Options</h2>
    </div>
    <div class="controls-container">
        <h2 class="text-align-center">{currentActiveItemName}</h2>
        <p class="current-time text-align-center">15:84</p>
        <p>{currentTime}</p>
        {#if timerBegan}
        <button onclick={redoCurrent}>
            <img src="/icons/Skip-Back-Icon.svg" alt="Skip-back Icon" width="24" height="24" />
        </button>
        <button onclick={toggleTimer}>
            {#if timerActive}
                <img src="/icons/Pause-Icon.svg" alt="Pause Icon" width="24" height="24" />
            {:else}
               <img src="/icons/Play-Icon.svg" alt="Unpause Icon" width="24" height="24" />
            {/if}
        </button>
        <button onclick={goNextItem}>
            <img src="/icons/Skip-Icon.svg" alt="Pause Icon" width="24" height="24" />
        </button>
        <p class="text-align-center">{currentActiveItem + 1} / {itemList.length}</p>
        {:else}
            <button onclick={startTimer}>Start Timer</button>
        {/if}
        <p>{totalTime}</p>
    </div>
    <div class="margin-inline-auto" style="width: 100%">
        <h2>Input area</h2>
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
</main>

<style>
    .controls-container {
        background-color: var(--color-neutral-800);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        & h2 {
            font-size: var(--text-size-3xl);
            font-weight: var(--font-weight-normal);
        }
        & .current-time {
            font-size: var(--text-size-5xl);
            font-weight: var(--font-weight-bold);
        }
    }

    .input-container {
        max-width: 8050px;
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
</style>
