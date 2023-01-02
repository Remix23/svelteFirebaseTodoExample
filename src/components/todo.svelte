<script>

    import { onMount } from "svelte";
    import Button from "./button.svelte";
    import { todos } from "src/js/states";

    export let message = "";
    export let completed = false;
    export let deadLine;
    export let priority;
    
    let creationDate;
    let completionDate;

    onMount( () => {
        creationDate = new Date();
    })

    

</script>

<div class="todo">

    <input type="text" bind:value={message} name="todo-mess" id="todo-mess">
    <input type="datetime" bind:value={deadLine} name="todo-deadline" id="todo-deadline">

</div>

<style>

</style>