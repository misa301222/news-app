import "firebase/auth"
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../app/firebaseApp";

const formatAuthUser = (user: any) => ({
    uid: user.uid,
    email: user.email
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const authStateChanged = async (authState: any) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return;
        }

        setLoading(true)
        var formattedUser = formatAuthUser(authState);
        setAuthUser(formattedUser);
        setLoading(false);
    };

    // listen for Firebase state change
    useEffect(() => {
        //const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
        const unsubscribe = getAuth(app).onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);

    const clear = () => {
        setAuthUser(null);
        setLoading(true);
    };

    //const auth = getAuth();

    const signInWithEmailAndPasswordAuth = async (email: any, password: any) => {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password);
    }

    const createUserWithEmailAndPasswordAuth = async (email: any, password: any) => {
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password);
    }
    /*
        const signOut = () => {
            signOut().then(clear);
        }
        */


    useEffect(() => {
        const unsubscribe = getAuth(app).onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    }, []);


    return {
        authUser,
        loading,
        signInWithEmailAndPasswordAuth,
        createUserWithEmailAndPasswordAuth,
        //signOut
    };
}