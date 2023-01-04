<script>
    import { auth, db } from "src/js/firebase";
    import { onAuthStateChanged, signOut } from "firebase/auth";

    export let userName;

    const logOut = () => {
        signOut(auth);
    }

</script>

<div class="info">

    <h1>Welcome {userName}</h1>

    <button on:click={logOut}>Log Out</button>

</div>

<style>

</style>