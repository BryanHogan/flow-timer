<script>
    import { onDestroy, onMount } from "svelte";
    import { showOptions, showHowTo } from "../stores/state.svelte.js";
    import HowToPanel from "./HowToPanel.svelte";
    import TimerControls from "./TimerControls.svelte";
    import TimerModal from "./TimerModal.svelte";
    import TimerOptions from "./TimerOptions.svelte";
    import TimerResetControls from "./TimerResetControls.svelte";
    import TaskListEditor from "./TaskListEditor.svelte";

    const OPTIONS_STORAGE_KEY = "flow-timer-options";
    const SECONDS_PER_MINUTE = 60;

    const createDefaultItems = () => [
        { name: "Task 1", length: 5 },
        { name: "Task 2", length: 5 },
        { name: "", length: 10 },
    ];

    const createBlankItem = () => ({ name: "", length: null });

    let itemList = $state(createDefaultItems());
    let intervalID = null;
    let optionsLoaded = $state(false);

    let statusMessage = $state("Ready?");
    let currentActiveItem = $state(0);
    let currentTime = $state(0);
    let timerActive = $state(false);
    let timerBegan = $state(false);
    let playNotification = $state(false);
    let playSound = $state("none");

    let currentItem = $derived(itemList[currentActiveItem] ?? { name: "", length: 0 });
    let activeItemLength = $derived(Number(currentItem.length) || 0);
    let remainingTime = $derived(
        Math.max(0, activeItemLength * SECONDS_PER_MINUTE - currentTime),
    );

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

    let titleClockFace = $derived.by(() => {
        if (timerBegan) {
            const taskTitle = statusMessage ? `${statusMessage} - ` : "";
            const timerState = timerActive ? "" : "Paused - ";
            return `${timerState}${clockFace} - ${taskTitle}Flow Timer`;
        }

        if (statusMessage === "Complete!") {
            return "Complete - Flow Timer";
        }

        return "Flow Timer";
    });

    onMount(() => {
        restoreOptions();
        applyPanelFromUrl();
    });

    onDestroy(() => {
        clearTimers();
    });

    $effect(() => {
        checkIfItemListFull();
    });

    $effect(() => {
        if (!optionsLoaded) return;

        try {
            localStorage.setItem(
                OPTIONS_STORAGE_KEY,
                JSON.stringify({ playSound, playNotification }),
            );
        } catch (error) {
            console.warn("Unable to save Flow Timer options:", error);
        }
    });

    function restoreOptions() {
        try {
            const storedOptions = localStorage.getItem(OPTIONS_STORAGE_KEY);
            if (!storedOptions) {
                optionsLoaded = true;
                return;
            }

            const options = JSON.parse(storedOptions);
            if (["none", "pluck", "clang"].includes(options.playSound)) {
                playSound = options.playSound;
            }
            if (typeof options.playNotification === "boolean") {
                playNotification = options.playNotification;
            }
        } catch (error) {
            console.warn("Unable to restore Flow Timer options:", error);
        } finally {
            optionsLoaded = true;
        }
    }

    function applyPanelFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const panel = params.get("panel");

        if (panel === "options") {
            showOptions.set(true);
            showHowTo.set(false);
            removePanelParam(params);
        }

        if (panel === "how-to") {
            showHowTo.set(true);
            showOptions.set(false);
            removePanelParam(params);
        }
    }

    function removePanelParam(params) {
        params.delete("panel");
        const query = params.toString();
        const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
        window.history.replaceState({}, "", nextUrl);
    }

    function closeHowToUse() {
        showHowTo.set(false);
    }

    function closeSettings() {
        showOptions.set(false);
    }

    function toggleTimer() {
        if (!timerBegan) {
            startTimer();
            return;
        }

        timerActive = !timerActive;
    }

    function startTimer() {
        const preparedItems = getPreparedItems();

        if (preparedItems.length === 0) {
            resetTimer();
            statusMessage = "Add at least one task.";
            return;
        }

        if (playNotification) {
            askNotificationPermission();
        }

        clearTimers();
        itemList = preparedItems;
        currentActiveItem = 0;
        currentTime = 0;
        statusMessage = itemList[currentActiveItem].name;
        timerActive = true;
        timerBegan = true;
        startIntervals();
    }

    function startIntervals() {
        intervalID = setInterval(() => {
            if (!timerActive || !timerBegan) return;

            const nextTime = currentTime + 1;
            currentTime = nextTime;

            if (
                nextTime >=
                Number(itemList[currentActiveItem].length) * SECONDS_PER_MINUTE
            ) {
                goNextItem();
            }
        }, 1000);
    }

    function finishTimer() {
        clearTimers();
        timerActive = false;
        timerBegan = false;
        statusMessage = "Complete!";
    }

    function goNextItem() {
        if (!timerBegan) return;

        sendNotification();

        if (currentActiveItem < itemList.length - 1) {
            currentActiveItem = currentActiveItem + 1;
            statusMessage = itemList[currentActiveItem].name;
            currentTime = 0;
            return;
        }

        currentTime = activeItemLength * SECONDS_PER_MINUTE;
        finishTimer();
    }

    function resetTimer() {
        clearTimers();
        timerBegan = false;
        currentTime = 0;
        currentActiveItem = 0;
        timerActive = false;
        statusMessage = "Ready?";
    }

    function resetAll() {
        resetTimer();
        itemList = [{ name: "Task 1", length: 10 }];
    }

    function clearTimers() {
        if (intervalID) {
            clearInterval(intervalID);
            intervalID = null;
        }
    }

    function checkIfItemListFull() {
        if (timerBegan) return;

        if (itemList.length === 0) {
            createNewInputField();
            return;
        }

        const lastItem = itemList[itemList.length - 1];
        if (lastItem.name.trim() !== "" && Number(lastItem.length) > 0) {
            createNewInputField();
        }
    }

    function getPreparedItems() {
        return itemList
            .map((item) => ({
                name: item.name.trim(),
                length: Number(item.length),
            }))
            .filter((item) => item.name !== "" && item.length > 0);
    }

    function createNewInputField() {
        itemList = [...itemList, createBlankItem()];
    }

    function redoCurrent() {
        if (!timerBegan) return;

        if (currentTime === 0 && currentActiveItem > 0) {
            currentActiveItem = currentActiveItem - 1;
            statusMessage = itemList[currentActiveItem].name;
        }
        currentTime = 0;
    }

    function updateItemName(index, name) {
        itemList[index].name = name;
    }

    function updateItemLength(index, length) {
        itemList[index].length = length;
    }

    function updateSound(sound) {
        playSound = sound;
    }

    function updateNotificationPreference(enabled) {
        playNotification = enabled;
        if (enabled) {
            askNotificationPermission();
        }
    }

    function askNotificationPermission() {
        if (!("Notification" in window)) return;
        if (Notification.permission !== "default") return;

        Notification.requestPermission();
    }

    function sendNotification() {
        playSoundNotification();

        if (!playNotification || !("Notification" in window)) return;

        if (Notification.permission === "granted") {
            const text = `Your time for ${currentItem.name} is over.`;
            try {
                new Notification("Flow Timer", { body: text });
            } catch (error) {
                console.error("Error showing notification:", error);
            }
        }
    }

    function playSoundNotification() {
        if (playSound === "none" || !("Audio" in window)) return;

        const soundPath =
            playSound === "pluck"
                ? "/sounds/notification-pluck.mp3"
                : "/sounds/notification-clang.mp3";
        const sound = new Audio(soundPath);
        sound.play().catch((error) => {
            console.warn("Unable to play notification sound:", error);
        });
    }

    async function testNotification() {
        if (!("Notification" in window)) return;

        const permission =
            Notification.permission === "default"
                ? await Notification.requestPermission()
                : Notification.permission;

        if (permission === "granted") {
            new Notification("Flow Timer", {
                body: "Test notification.",
            });
        }
    }
</script>

<svelte:head><title>{titleClockFace}</title></svelte:head>

<section class="base-layout timer-shell" aria-label="Flow Timer controls">
    {#if $showHowTo}
        <TimerModal
            title="How to use"
            closeLabel="Close how to use"
            labelledBy="how-to-modal-title"
            onClose={closeHowToUse}
        >
            <HowToPanel />
        </TimerModal>
    {/if}

    {#if $showOptions}
        <TimerModal
            title="Settings"
            closeLabel="Close settings"
            labelledBy="settings-modal-title"
            onClose={closeSettings}
        >
            <TimerOptions
                {playSound}
                {playNotification}
                onSoundChange={updateSound}
                onNotificationChange={updateNotificationPreference}
                onTestSound={playSoundNotification}
                onTestNotification={testNotification}
            />
        </TimerModal>
    {/if}

    <TimerControls
        {statusMessage}
        {clockFace}
        {timerActive}
        {timerBegan}
        {currentActiveItem}
        itemCount={itemList.length}
        {currentTime}
        {activeItemLength}
        onRedo={redoCurrent}
        onToggle={toggleTimer}
        onSkip={goNextItem}
    />

    <TaskListEditor
        {itemList}
        {timerBegan}
        onNameChange={updateItemName}
        onLengthChange={updateItemLength}
    />

    <TimerResetControls onResetTimer={resetTimer} onResetAll={resetAll} />
</section>

<style>
    .timer-shell {
        width: 100%;
    }
</style>
