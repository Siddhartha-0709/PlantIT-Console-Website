import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, getDatabase, push } from "firebase/database";
import { ref as sref, getStorage } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import {
    Dots,
    Levels,
    Sentry,
    Spinner,
    Squares,
    Digital,
    Bounce,
    Windmill
} from "react-activity";
import "react-activity/dist/library.css";
import Header from './Header';
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);

export default function Upload() {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState([]);
    const [productImage, setProductImage] = useState();
    const [url, setUrl] = useState('');
    const [progress, setProgrss] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productsRef = ref(database, 'products');
        const storageRef = sref(storage, productImage.name);
        const uploadTask = uploadBytesResumable(storageRef, productImage);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                var progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log("Upload is " + progress + "% done");
                setProgrss(true);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url);
                    console.log(url);
                    push(productsRef, {
                        name: productName,
                        price: productPrice,
                        description: productDescription,
                        imageUrl: url,
                        seller:"Apario Retail"
                    }).then(() => {
                        alert('Upload Complete');
                        setProgrss(false);
                    });
                    setProductName('');
                    setProductPrice('');
                    setProductDescription([]);
                    setProductImage(null);
                });
            }
        );
    };

    return (
        <>
        <Header />
        <div style={{marginTop: '100px', marginLeft:'50px', marginRight:'50px'}}>
        <h1 className="text-2xl font-bold text-black mb-4">Upload a Product</h1>
            {progress ? (
                <div className="text-black text-center">
                    <h1 className='font-bold'>Uploading, Please Wait</h1>
                    <Dots size={60} />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className='font-bold text-black'>Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-gray-100 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productPrice" className='font-bold text-black'>Product Price</label>
                        <input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-gray-100 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className='font-bold text-black'>Product Description</label>
                        <input
                            type="text"
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="w-full border rounded-md px-3 py-2 bg-gray-100 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productImage" className='font-bold text-black'>Product Image</label>
                        <input
                            type="file"
                            id="productImage"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            className="w-full"
                        />
                        {productImage && (
                            <img
                                src={URL.createObjectURL(productImage)}
                                alt="Product Preview"
                                className="mt-2 max-w-md"
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-black rounded-md px-4 py-2 hover:bg-blue-700"
                    >
                        Upload Product
                    </button>
                </form>
            )}
        </div>
        </>
    );
}