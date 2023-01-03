<script>

    import { onMount } from "svelte";
    import Button from "./button.svelte";
    import { todos } from "src/js/states";

    export let message = "";
    export let completed = false;
    export let deadLine;
    export let priority;
    
    export let creationDate;
    export let completionDate;

    let edit = false;

    const delTodo = () => {

    }


</script>

<div class:todo class='{edit ? "edit" : "present"}'>

    <input type="text" bind:value={message} name="todo-mess" id="todo-mess">
    <input type="datetime" bind:value={deadLine} name="todo-deadline" id="todo-deadline">

    <div class="controls">
        <!-- edit google icon -->
        <span on:click={() => {edit = !edit}}></span>

        <!-- delete google icon -->
        <span></span>
    </div>

</div>

<style>

</style>