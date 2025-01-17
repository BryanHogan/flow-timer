<script>
    class Item {
        constructor(name, length) {
            this.name = name;
            this.length = length;
        }
    }

    const timeCurrentItem = $state(15);
    const itemList = $state([
        { name: "Task 1", length: 4 },
        { name: "Task 2", length: 4 },
        { name: "", length: 18 },
    ]);
    const totalTime = $derived.by(() => 
        itemList.reduce((sum, item) => sum + item.length, 0)
    );
    let currentActiveItem = $state(0);
    const currentActiveItemName = $derived(itemList[currentActiveItem].name);

    let currentTime = $state(0);
    let totalTimePassed = $state(0);

    function countTotalTimePassed() {
        totalTimePassed = 0;
        setInterval(() => {
            totalTimePassed = totalTimePassed + 1;
        }, 1000);
    }

    function startTimer() {
        countTotalTimePassed();
        currentTime = 0;
        setInterval(() => {
            currentTime = currentTime + 1;
            if (currentTime >= itemList[currentActiveItem].length) {
                console.log("VICTORYYY");
                if (currentActiveItem < itemList.length) {
                currentActiveItem = currentActiveItem + 1;
                currentTime = 0;
                } else {
                    finishTimer();
                }
            }
        }, 1000);
    }

    function finishTimer() {
        console.log("Finished!");
    }

    function skipCurrentActiveItem() {
        currentActiveItem = currentActiveItem + 1;
    }

    function checkIfItemListFull() {
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

    function createNewInputField() {
        itemList.push({ name: "", length: null });
    }

    $effect(() => {
        checkIfItemListFull();
    });
</script>

<main class="base-layout">
    <h1 class="text-align-center">Flow Timer</h1>
    <div>
        <h2>How to use (((description)))</h2>
    </div>
    <div>
        <h2>Options</h2>
    </div>
    <div>
        <h2>{currentActiveItemName}</h2>
        <p>Total time passed: {totalTimePassed}</p>
        <p>{currentTime}</p>
        <button onclick={startTimer}>Start Timer</button>
        <button onclick={skipCurrentActiveItem}>Skip Current Item</button>
        <p>{totalTime}</p>
    </div>
    <div>
        <h2>Input area</h2>
        {#each itemList as item}
            <input type="text" bind:value={item.name} />
            <input type="number" bind:value={item.length} />
        {/each}
        <button onclick={checkIfItemListFull}>Check if full</button>
    </div>
</main>

<style>
</style>
