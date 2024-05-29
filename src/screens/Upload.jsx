import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { ref, getDatabase, push } from "firebase/database";
import { ref as sref, getStorage } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import {
    Dots,
    Levels,
    Sentry,
    Spinner,
    Squares,
    Digital,
    Bounce,
    Windmill,
} from "react-activity";
import "react-activity/dist/library.css";
import Header from "./Header";
import Aside from "./Aside";
import { useLocation } from "react-router-dom";
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);

export default function Upload() {
    const location = useLocation();
    const userData = location.state.userData;
    // console.log(userData);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState([]);
    const [productImage, setProductImage] = useState();
    const [url, setUrl] = useState("");
    const [progress, setProgrss] = useState(false);

    function generateProductId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let orderId = '';
        
        // Add timestamp to ensure uniqueness
        const timestamp = Date.now().toString(36);
        orderId += timestamp;
      
        // Generate random characters to complete the ID
        for (let i = 0; i < length - timestamp.length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          orderId += characters[randomIndex];
        }
        
        return orderId;
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productsRef = ref(database, "products");
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
                        seller: userData.name,
                        productId:generateProductId(6)
                    }).then(() => {
                        alert("Upload Complete");
                        setProgrss(false);
                    });
                    setProductName("");
                    setProductPrice("");
                    setProductDescription([]);
                    setProductImage(null);
                });
            }
        );
    };

    return (
        <>
            <Aside userData={userData} />
            <div style={{}}>
                <div className="bg-black pt-3 pb-1">
                    <h1 className="text-3xl text-white mb-4 text-center">
                        Seller Product Upload Portal
                    </h1>
                    <hr />
                    <br />
                    <h1 className="text  text-white mb-5 text-center">
                        Effortlessly upload and your products with our intuitive upload
                        interface
                    </h1>
                </div>
                {progress ? (
                    <div className="text-black text-center">
                        <h1 className="font-bold">Uploading, Please Wait</h1>
                        <Dots size={60} />
                    </div>
                ) : (
                    <center>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <table style={{width:'900px', height:'300px'}}>
                                <tr>
                                    <td style={{ border: '4px solid black' }}>
                                        <label htmlFor="productName" className="font-bold text-black">
                                            Product Name
                                        </label>
                                    </td>
                                    <td style={{ border: '4px solid black' }}>
                                        <input
                                            type="text"
                                            id="productName"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            className="border rounded-md px-3 py-2 bg-gray-300 text-black w-full"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '4px solid black' }}>
                                    <label htmlFor="productPrice" className="font-bold text-black">
                                    Product Price
                                </label>
                                    </td>
                                    <td style={{ border: '4px solid black' }}>
                                    <input
                                    type="number"
                                    id="productPrice"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                    className=" border rounded-md px-3 py-2 bg-gray-300 text-black w-full"
                                />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '4px solid black' }}>
                                    <label
                                    htmlFor="productDescription"
                                    className="font-bold text-black"
                                >
                                    Product Description
                                </label>
                                    </td>
                                    <td style={{ border: '4px solid black' }}>
                                    <input
                                    type="text"
                                    id="productDescription"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className=" border rounded-md px-3 py-2 bg-gray-300 text-black w-full"
                                    maxLength={200}
                                />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '4px solid black' }}><label htmlFor="productImage" className="font-bold text-black">
                                    Product Image
                                </label></td>
                                    <td style={{ border: '4px solid black' }}><input
                                    type="file"
                                    id="productImage"
                                    onChange={(e) => setProductImage(e.target.files[0])}
                                    className=""
                                    style={{
                                        width: "auto",
                                        maxWidth: "215px",
                                        minWidth: "215px",
                                    }}
                                />
                                {productImage && (
                                    <img
                                        src={URL.createObjectURL(productImage)}
                                        alt="Product Preview"
                                        className=""
                                        style={{
                                            height: "190px",
                                            width: "auto",
                                           
                                        }}
                                    />
                                )}</td>
                                </tr>
                            </table>
                            <br />
                            <button
                                type="submit"
                                className="bg-blue-500 text-black rounded-md px-4 py-2 hover:bg-blue-700"
                            >
                                Upload Product
                            </button>
                        </form>
                    </center>
                )}
            </div>
        </>
    );
}
