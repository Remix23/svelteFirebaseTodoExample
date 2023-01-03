<script>
    import Todo from "src/components/todo.svelte";
    import Authenticator from "src/components/authenticator.svelte";
    import Profile from "src/components/profile.svelte";

    import { todos } from "src/js/states";
    import { onMount, onDestroy } from "svelte";
    import { auth } from "src/js/firebase";
    import { onAuthStateChanged } from "firebase/auth";

    //todo adding
    let message = "";
    let deadLine;
    let priority;

    let maxId;

    // options
    let saveLocal = true;

    let user = auth.currentUser;

    onAuthStateChanged(() => {
        
    })

    onMount (() => {
        const loaded = localStorage.getItem("todos") || "[]";
        console.log(loaded);
        todos.set(JSON.parse(loaded));

        maxId = localStorage.getItem("maxId") || 0;
    })

    const saveToLocal = () => {
        const toSave = JSON.stringify(todos);
        localStorage.setItem("todos", toSave);

        localStorage.setItem("maxId", maxId);
    }

    const addTodo = () => {
        const todo = {
            "id" : maxId,
            "message" : message,
            "comleted" : false,
            "deadLine" : deadLine,
            "priority" : priority,
            "creationDate" : new Date(),
            "completionDate" : null
        };

        todos.set([...todos, todo]);

        maxId++;
    }

    onDestroy (() => {
        if (saveLocal) 
        {
            saveToLocal();
        }
    })

</script>


<div class="controls">
    {#if user}
        <Authenticator/>
    {:else}
        <Profile/>

    {/if}
</div>

<div class="adding">

    <input type="text" bind:value={message} >
    <input type="date" name="deadline-input" id="deadline-input" bind:value={deadLine}>
    <input type="range" name="priority-input" id="priority-input" min="0" max="10" step="1" bind:value={priority}>

    <!-- google icon for adding -->
    <span></span>

</div>

<div class="todos">
    {#each $todos as td}
        <Todo {td} />
    {/each}

</div>

<div class="options">
    <input type="checkbox" name="save-local" id="save-local" bind:checked={saveLocal}>
</div>

