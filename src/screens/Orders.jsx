import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";

import Aside from './Aside';
function Orders() {
    const location = useLocation();
    const userData = location.state.userData;
    // console.log(userData);
    const [orders, setOrders] = useState([]);
    const firebaseConfig = {
        apiKey: "AIzaSyA8PnNOuXFKGUarBqHQ7a94nIfP-boimhk",
        authDomain: "plantit-416016.firebaseapp.com",
        databaseURL: "https://plantit-416016-default-rtdb.firebaseio.com",
        projectId: "plantit-416016",
        storageBucket: "plantit-416016.appspot.com",
        messagingSenderId: "428181209108",
        appId: "1:428181209108:web:dd231b65b26e754486a701",
        measurementId: "G-C1PPLEPGY6",
    };
    const getOrders = async () => {
        var cartItemsAll = [];
        var userOrders = [];
        const dbRef = ref(getDatabase());
        await get(child(dbRef, `orders/`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const data = Object.values(snapshot.val());
                // console.log(data);
                for (let i = 0; i < data.length; i++) {
                    cartItemsAll.push(data[i].cartItems);
                }
                console.log(cartItemsAll);
                for (let i = 0; i < cartItemsAll.length; i++) {
                    for (let j = 0; j < cartItemsAll[i].length; j++) {
                        if (cartItemsAll[i][j].seller === userData.name) {
                            userOrders.push(cartItemsAll[i][j]);
                        }
                    }
                }
                console.log(userOrders);
                setOrders(userOrders);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    console.log(orders);
    useEffect(() => {
        getOrders();
    }, []);
    return (
        <>
            <div className="relative w-full bg-white">
                <Aside userData={userData} />
                    <div className="bg-black pt-3 pb-1">
                        <h1 className="text-3xl text-white mb-4 text-center">
                            Your Orders
                        </h1>
                        <hr />
                        <br />
                        <h1 className="text  text-white mb-5 text-center">
                            Effortlessly engage with your customers and grow your business
                        </h1>
                    </div>
                <div className="mx-auto grid max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4"
                    style={{ maxHeight: '690px', overflowY: 'scroll' }}
                >
                    {
                        orders.map((item, index) => (<>
                            <div key={index}
                                style={{ boxShadow: "2px 2px 4px 2px rgba(0, 0, 0, 0.2)", height: '400px', width: '100%', borderRadius: '10px', backgroundColor: 'white' }}
                                className='rounded-md shadow-md'
                            >
                                <center>
                                    <img
                                        src={item.imageUrl}
                                        alt="Laptop"
                                        class="rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] image-fit" />
                                </center>
                                <div className="p-4">
                                    <h1 className="inline-flex items-center text-lg font-semibold">{item.name}</h1>
                                    <p className="mt-3 text-sm text-gray-600">
                                        {item.description}
                                    </p>
                                    <h1 className="inline-flex items-center text-lg font-semibold">Price-{item.price}/-</h1>

                                    {/* <button
                                        type="button"
                                        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Add to Cart
                                    </button> */}
                                </div>
                            </div>
                        </>))
                    }
                </div>
            </div>
        </>
    )
}

export default Orders