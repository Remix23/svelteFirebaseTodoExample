<script>
    import Todo from "src/components/todo.svelte";
    import Authenticator from "src/components/authenticator.svelte";
    import Profile from "src/components/profile.svelte";

    import { todos } from "src/js/states";
    import { onMount, onDestroy } from "svelte";
    import { auth } from "src/js/firebase";
    import { onAuthStateChanged } from "firebase/auth";

    let saveLocal = true;

    let user = auth.currentUser;

    onAuthStateChanged(() => {
        
    })

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
    {#if user}
        <Authenticator/>
    {:else}
        <Profile/>

    {/if}
</div>

<div class="todos">
    {#each $todos as td}
        <Todo {td} />
    {/each}
</div>

<div class="options">
    <input type="checkbox" name="save-local" id="save-local" bind:checked={saveLocal}>
</div>

