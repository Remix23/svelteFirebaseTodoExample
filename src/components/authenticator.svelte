<script>

    import { auth, db } from "src/js/firebase";
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

    let pass = ""
    let passRepeat = "";

    let email;
    let nickname;

    const validateEmail = () => {
        let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return format.test(email)
    }

    const login = () => {

        if (!validateEmail()) return false;

        signInWithEmailAndPassword(auth, email, pass)
            .then ( userCredentials => {
            })
            .catch ( err => {

            });
    }

    const sigin = () => {

        if (!validateEmail()) return false;
        if (pass.trim() !== passRepeat.trim()) return false;

        createUserWithEmailAndPassword(auth, email, pass)
            .then( userCredentials => {

            })
            .catch ( err => {

            });
    }

</script>

<div class="options">

    <div class="login-form form">
        <input type="email" name="email-login" id="email-login" bind:value={email}>
        <input type="password" name="pass-login" id="pass-login" bind:value={pass}>

        <button on:click={login} >Log In</button>
    </div>

    <div class="signin-form form">
        <input type="text" name="nickname" id="nickname" bind:value={nickname}>
        <input type="email" name="email-signin" id="email-signin" bind:value={email}>
        <input type="password" name="pass-signin" id="pass-signin" bind:value={pass}>
        <input type="password" name="pass-repeat" id="pass-repeat" bind:value={passRepeat}>

        <button on:click={sigin} >Sign In</button>
    </div>

</div>