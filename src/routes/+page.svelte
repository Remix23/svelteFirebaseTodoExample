<script>
    import Todo from "src/components/todo.svelte";
    import { todos } from "src/js/states";
    import { onMount, onDestroy } from "svelte";

    let saveLocal = true;

    onMount (() => {
        const loaded = localStorage.getItem("todos") || "[]";
        console.log(loaded);
        todos.set(JSON.parse(loaded));
    })

    const saveToLocal = () => {
        const toSave = JSON.stringify(todos);
        localStorage.setItem("todos", toSave);
    }

    onDestroy (() => {
        if (saveLocal) 
        {
            saveToLocal();
        }
    })

</script>


<div class="controls">

</div>

<div class="todos">
    {#each $todos as td}
        <Todo {td} />
    {/each}
</div>

<div class="options">
    <input type="checkbox" name="save-local" id="save-local" bind:checked={saveLocal}>
</div>

