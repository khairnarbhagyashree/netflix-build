import { async } from '@firebase/util';
import { collection, query, where, getDocs, onSnapshot, addDoc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import db from '../firebase';
import "./PlansScreen.css";
import { loadStripe } from "@stripe/stripe-js";
import { selectUser } from '../features/userSlice';



function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const productRef = collection(db, "products");
        const q = query(productRef, where("active", "==", true));


        const products = {};
        onSnapshot(q, (querySnapShot) => {
            querySnapShot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data(),
                    };

                });
            });
            setProducts(products);
        })

    }, []);
    console.log(products);

    const loadCheckout = async (priceId) => {
        // const docRef = await db
        //     .collection('customers')
        //     .doc(user.uid)
        //     .collection("checkout_sessions")
        //     .set({
        //         price: priceId,
        //         success_url: window.location.origin,
        //         cancel_url: window.location.origin,
        //     })

        const docRef = collection(db, `customers/${user.uid}/checkout_sessions`);
        const general = await addDoc(docRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        const querySnapshot = await getDocs(docRef);
        querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            const { error, sessionId } = doc.data();

            if (error) {
                //Show an error to your customer and
                //inspect your cloud function logs in the Firebase console.
                alert('An error occured: ${error.message}');
            }
            if (sessionId) {
                //We have a session lets redirect to Checkout
                //Init Stripe
                const stripe = await loadStripe("pk_test_51Mh8TnSJBdr0f79Zmxq3danQBMSVlA1mjEfHFSYjljuAatpz8ZRQEwTmFiLUgGmIBtWQkpHbrdFnc4qLXTzVXmXf00aI9Gli2c");
                stripe.redirectToCheckout({ sessionId });
            }

        });


        // console.log("general", general.id, docSnap.data());

        // onSnapshot(docRef, (querySnapShot) => {
        //     const { error, sessionId } = querySnapShot.data();
        //     console.log("herw", error, sessionId);

        // })



        // docRef.onSnapshot(async (snap) => {
        //     const { error, sessionId } = snap.data();

        //     if (error) {
        //         //Show an error to your customer and
        //         //inspect your cloud function logs in the Firebase console.
        //         alert('An error occured: ${error.message}');
        //     }
        //     if (sessionId) {
        //         //We have a session lets redirect to Checkout
        //         //Init Stripe
        //         const stripe = await loadStripe("pk_test_51Mh8TnSJBdr0f79Zmxq3danQBMSVlA1mjEfHFSYjljuAatpz8ZRQEwTmFiLUgGmIBtWQkpHbrdFnc4qLXTzVXmXf00aI9Gli2c");
        //         stripe.redirectToCheckout({ sessionId });
        //     }
        // });
    };

    return (
        <div className='plansScreen'>
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className="plansScreen_plan" key={productId}>
                        <div className="plansScreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlansScreen;