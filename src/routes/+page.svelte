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
    let priority = 5;

    let maxId;

    // options
    let saveLocal = true;

    $: userName = "";
    let tds;

    todos.subscribe (val => {
        tds = Array.from(val);

        console.log(tds)
    })

    onAuthStateChanged(auth, user => {
        if (user) {
            userName = user.email;
        } else {
            userName = "";
        }
    })

    onMount (() => {
        const loaded = localStorage.getItem("todos") || [];
        todos.set(JSON.parse(loaded));

        maxId = localStorage.getItem(   "maxId") || 0;
    })

    const saveToLocal = () => {
        if (typeof window === "undefined") return 

        const toSave = JSON.stringify(todos);
        localStorage.setItem("todos", toSave);

        localStorage.setItem("maxId", maxId);
    }

    const validateTodo = () => {
        if (message === "") return false;
        if (deadLine === "null") return false;

        return true;
    }

    const addTodo = () => {
        // validate

        if (!validateTodo()) return;

        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();

        if (month < 10) month = "0" + month.toString()

        const todo = {
            "id" : maxId,
            "message" : message,
            "completed" : false,
            "deadLine" : deadLine,
            "priority" : priority,
            "creationDate" : `${year}-${month}-${day}`,
            "completionDate" : null
        };

        console.table(todo)

        todos.set([...tds, todo]);

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
    {#if userName === ""}
        <Authenticator/>
    {:else}
        <Profile userName={userName}/>

    {/if}
</div>

<div class="adding">
    <label for="mess-input">What do you need to do: </label>
    <input type="text" bind:value={message} name="mess-input" id="mess-input">
    
    <label for="deadline-input">Enter deadline: </label>
    <input type="date" name="deadline-input" id="deadline-input" bind:value={deadLine}>
    
    <label for="priority-input">Enter task's priority [{priority}]</label>
    <input type="range" name="priority-input" id="priority-input" min="0" max="10" step="1" bind:value={priority}>

    <!-- google icon for adding -->
    <button on:click={addTodo} >
        <span class="material-symbols-outlined">
            add
        </span>
    </button>

</div>

<div class="todos">
    {#each tds as td}
        <Todo {...td} />
    {/each}

</div>

<div class="options">
    <input type="checkbox" name="save-local" id="save-local" bind:checked={saveLocal}>
</div>

<style>

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

    }

    .todos {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-height: 30%;
        min-width: 30%;
    }

    .adding {
        position: fixed;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 300px;
    }

</style>