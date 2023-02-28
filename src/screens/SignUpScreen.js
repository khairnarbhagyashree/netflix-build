import React, { useRef } from 'react';
import { auth } from '../Firebase';
import "./SignUpScreen.css";

function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            console.log(authUser);
        })
            .catch((error) => {
                alert(error.message);
            });
    };

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        )
            .then((authUser) => {
                console.log(authUser);
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="SignUpScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password" />
                <button type="submit" onClick={signIn
                }>Sign In</button>

                <h4>
                    <span className="SignUpScreen_gray">New to Netflix? </span>
                    <span className="SignUpScreen_link" onClick={register
                    }> Sign up now.</span>
                </h4>
            </form>
        </div>
    );
}

export default SignUpScreen;