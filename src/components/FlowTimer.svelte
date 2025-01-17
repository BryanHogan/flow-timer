<script>
    class Item {
        constructor(name, length) {
            this.name = name;
            this.length = length;
        }
    }

    const timeCurrentItem = $state(15);
    const itemList = $state([
        { name: "Task 1", length: 15 },
        { name: "Task 2", length: 17 },
        { name: "", length: 18 },
    ]);
    const totalTime = $derived.by(() => 
        itemList.reduce((sum, item) => sum + item.length, 0)
    );
    const currentActiveItem = $state(0);

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
        <h2>Current item active</h2>
        <p>{timeCurrentItem}</p>
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
