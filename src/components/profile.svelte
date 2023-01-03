<script>
    import { auth, db } from "src/js/firebase";
    import { signOut } from "firebase/auth";

    let user = auth.currentUser;

    const logOut = () => {
        signOut(auth);
    }

</script>

<div class="info">

    <h1>Welcome {user.displayName}</h1>

    <button on:click={logOut}>Log Out</button>

</div>

<style>
    
</style>