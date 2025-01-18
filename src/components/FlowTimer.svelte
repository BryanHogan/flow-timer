<script>
    /* ========================= Variables ========================= */
    let itemList = $state([
        { name: "Task 1", length: 4 },
        { name: "Task 2", length: 4 },
        { name: "", length: 8 },
    ]);
    let intervalID;
    let intervalIDTotal;

    const totalTime = $derived.by(() =>
        itemList.reduce((sum, item) => sum + item.length, 0),
    );

    let statusMessage = $state("Ready?");
    let currentActiveItem = $state(0);

    let currentTime = $state(0);
    let totalTimePassed = $state(0);
    let timerActive = $state(false);
    let timerBegan = $state(false);
    let remainingTime = $derived(
        Math.max(0, (itemList[currentActiveItem].length * 60) - currentTime),
    );

    let playNotification = $state(false);
    let playSound = $state("none");

    let showOptions = $state(true);
    let showHowToUse = $state(true);

    let clockHours = $derived(Math.floor(remainingTime / 3600));
    let clockMinutes = $derived(Math.floor((remainingTime % 3600) / 60));
    let clockSeconds = $derived(remainingTime % 60);
    let clockFace = $derived(
        (clockHours > 0 ? clockHours + ":" : "") +
            (clockMinutes < 10 ? "0" : "") +
            clockMinutes +
            ":" +
            (clockSeconds < 10 ? "0" : "") +
            clockSeconds,
    );

    /* ========================= Timer Functions ========================= */

    function toggleTimer() {
        if (timerBegan == false) {
            startTimer();
        } else {
            timerActive = !timerActive;
        }
    }

    function finishTimer() {
        timerActive = false;
        statusMessage = "Complete!";
        timerBegan = false;
    }

    function startTimer() {
        askNotificationPermission();
        timerActive = true;
        timerBegan = true;
        currentActiveItem = 0;
        statusMessage = itemList[currentActiveItem].name;
        prepareList();
        countTotalTimePassed();
        currentTime = 0;
        if (intervalID) {
            clearInterval(intervalID);
        }
        intervalID = setInterval(() => {
            if (timerActive && timerBegan) {
                currentTime = currentTime + 1;
                if (currentTime > itemList[currentActiveItem].length * 60) {
                    goNextItem();
                }
            }
        }, 1000);
    }

    function countTotalTimePassed() {
        totalTimePassed = 0;
        if (intervalIDTotal) {
            clearInterval(intervalIDTotal);
        }
        intervalIDTotal = setInterval(() => {
            if (timerActive && timerBegan) {
                totalTimePassed = totalTimePassed + 1;
            }
        }, 1000);
    }

    function goNextItem() {
        sendNotification();
        if (currentActiveItem < itemList.length - 1) {
            currentActiveItem = currentActiveItem + 1;
            statusMessage = itemList[currentActiveItem].name;
            currentTime = 0;
        } else {
            finishTimer();
        }
    }

    function resetTimer() {
        timerBegan = false;
        currentTime = 0;
        currentActiveItem = 0;
        totalTimePassed = 0;
        timerActive = false;
        statusMessage = "Ready?";
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
    }

    function createNewInputField() {
        itemList.push({ name: "", length: null });
    }

    function redoCurrent() {
        if (currentTime == 0 && currentActiveItem > 0) {
            currentActiveItem = currentActiveItem - 1;
            statusMessage = itemList[currentActiveItem].name;
        }
        currentTime = 0;
    }

    function resetAll() {
        resetTimer();
        itemList = [{ name: "Task 1", length: 10 }];
    }

    /* ========================= Notifications ========================= */

    function askNotificationPermission() {
        if (!("Notification" in window)) {
            return;
        }
        Notification.requestPermission();
    }

    function sendNotification() {
        playSoundNotification();
        if (playNotification && "Notification" in window) {
            if (Notification.permission === "granted") {
                const text = `Your time for ${itemList[currentActiveItem].name} is over.`;
                try {
                    new Notification("Flow Timer", { body: text });
                } catch (error) {
                    console.error("Error showing notification:", error);
                }
            } else {
                console.warn("Notification permission not granted or denied.");
            }
        }
    }
    function playSoundNotification() {
        if (playSound == "pluck") {
            let pluckSound = new Audio("/sounds/notification-pluck.mp3");
            pluckSound.play();
        }
        if (playSound == "clang") {
            let clangSound = new Audio("/sounds/notification-clang.mp3");
            clangSound.play();
        }
    }

    function testNotification() {
        Notification.requestPermission();
        const text = `Test notification. You rock 🎸!`;
        new Notification("Flow Timer", {
            body: text,
        });
    }
</script>

<main class="base-layout">
    <h1 class="text-align-center">
        Flow Timer<span class="visually-hidden">- the Time-Boxing Tool</span>
    </h1>
    <section class="margin-inline-auto description-container section">
        <div class="flex-center flex-row h2-row-container">
            <h2 class="simpler-h2 text-align-center">
                How to use<span class="visually-hidden"> flow timer</span>
            </h2>
            <button onclick={() => (showHowToUse = !showHowToUse)}>
                <img
                    src="/icons/Chevron-Up-Icon.svg"
                    alt="Chevron Up Icon"
                    width="24"
                    height="24"
                    class={showHowToUse ? "chevron-down" : "chevron-right"}
                />
            </button>
        </div>
        {#if showHowToUse}
            <div class="margin-inline-auto" style="width: fit-content;">
                <ol style="padding-left: 0; list-style-position: inside;">
                    <li>Add items to the list. Include name and length.</li>
                    <li>Press play to start flow timer.</li>
                </ol>
                <p>Learn about the benefits of time-boxing.</p>
            </div>
        {/if}
    </section>
    <section class="section options-container margin-inline-auto">
        <div class="flex-center flex-row h2-row-container">
            <h2 class="simpler-h2 text-align-center">Options</h2>
            <button onclick={() => (showOptions = !showOptions)}>
                <img
                    src="/icons/Chevron-Up-Icon.svg"
                    alt="Chevron Up Icon"
                    width="24"
                    height="24"
                    class={showOptions ? "chevron-down" : "chevron-right"}
                />
            </button>
        </div>
        {#if showOptions}
            <ul role="list">
                <li>
                    <label
                        >Sound:
                        <select bind:value={playSound}>
                            <option value="none">None</option>
                            <option value="pluck">Pluck</option>
                            <option value="clang">Clang</option>
                        </select>
                    </label>
                    <button onclick={playSoundNotification}
                        ><small>Test sound</small></button
                    >
                </li>
                <li>
                    <label>
                        Send Notification
                        <input
                            type="checkbox"
                            bind:checked={playNotification}
                        />
                    </label>
                    <button onclick={testNotification}
                        ><small>Test notification</small></button
                    >
                </li>
            </ul>
        {/if}
    </section>
    <section class="section controls-container">
        <h2 class="text-align-center" style="margin-top: var(--space-m);">
            {statusMessage}
        </h2>
        <p
            class="current-time text-align-center"
            style="padding-bottom: var(--space-m);"
        >
            {clockFace}
        </p>
        <div class="button-control-group">
            <button onclick={redoCurrent}>
                <img
                    src="/icons/Skip-Back-Icon.svg"
                    alt="Skip-back Icon"
                    width="24"
                    height="24"
                />
            </button>
            <button onclick={toggleTimer} class={timerBegan ? "" : "glow"}>
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
                        alt="Play Icon"
                        width="24"
                        height="24"
                    />
                {/if}
            </button>
            <button onclick={goNextItem}>
                <img
                    src="/icons/Skip-Icon.svg"
                    alt="Skip Icon"
                    width="24"
                    height="24"
                />
            </button>
        </div>
        <p class="text-align-center" style="margin-top: var(--space-m);">
            {#if timerBegan}
                {currentActiveItem + 1} / {itemList.length}
            {:else}
                Click play to start timer.
            {/if}
        </p>
        <progress
            max={itemList[currentActiveItem].length * 60}
            value={currentTime}
            style="width: 100%;"
            >{currentTime} / {itemList[currentActiveItem].length * 60}</progress
        >
    </section>
    <section class="margin-inline-auto section" style="width: 100%">
        <h2 class="simpler-h2 text-align-center visually-hidden">Input area</h2>
        <div class="input-container">
            <div
                class="input-description"
                style="padding-bottom: var(--space-s);"
            >
                <p class="name">Name</p>
                <p class="length">Length (min)</p>
            </div>
            <ul role="list">
                {#each itemList as item}
                    <li class="item-input-row" role="listitem">
                        <input
                            type="text"
                            bind:value={item.name}
                            class="name-input"
                            disabled={timerBegan}
                            aria-disabled={timerBegan}
                            aria-label="Input field for item name"
                        />
                        <input
                            type="number"
                            bind:value={item.length}
                            class="length-input"
                            disabled={timerBegan}
                            aria-disabled={timerBegan}
                            aria-label="Input field for item length in minutes"
                        />
                    </li>
                {/each}
            </ul>
        </div>
    </section>
    <div class="section flex-center" style="gap: var(--space-m);">
        <button onclick={resetTimer}>
            <img
                src="/icons/Reset-Timer-Icon.svg"
                alt="Reset timer icon"
                width="24"
                height="24"
            />
        </button>
        <button onclick={resetAll}>
            <img
                src="/icons/Reset-All-Icon.svg"
                alt="Reset all icon"
                width="24"
                height="24"
            />
        </button>
    </div>
</main>

<style>
    progress,
    progress::-webkit-progress-bar {
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
    }
    .simpler-h2 {
        font-size: var(--text-size-xl);
        font-weight: var(--font-weight-normal);
        color: var(--color-neutral-300);
    }
    .h2-row-container {
        align-items: center;
        margin-bottom: var(--space-s);
        gap: var(--space-xs);
    }

    main > section:last-of-type {
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
    .glow {
        box-shadow: 0px 0px 2px 1px var(--color-accent-600);
        background-color: var(--color-accent-800);
    }
    .chevron-down {
        transform: rotate(180deg);
    }
    .chevron-right {
        transform: rotate(90deg);
    }

    .description-container,
    .options-container {
        border: 1px solid var(--color-neutral-700);
        border-radius: var(--border-radius-m);
        padding: var(--space-m) var(--space-s);
        max-width: 450px;
        width: 100%;
        & div ol {
            padding-bottom: var(--space-2xs);
        }
        & img {
            transition: transform var(--transition-normal);
        }
    }
    .options-container ul {
        display: flex;
        flex-direction: column;
        gap: var(--space-2xs);
        & li {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-s);
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
            gap: var(--space-m);
        }
        & .item-input-row {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: center;
            gap: var(--space-xs);
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
