<script>
    class item {
        constructor(name, length) {
            this.name = name;
            this.length = length;
        }
    }

    const totalTime = $state(15);
    const timeCurrentItem = $state(15);
    const itemList = $state([15, 17, 18]);
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
    </div>
    <div>
        <h2>Input area</h2>
        <p>{itemList[2]}</p>
    </div>
</main>

<style>
</style>
