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
import Aside from "./Aside";
import { useLocation } from "react-router-dom";
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

export default function BlogUpload() {
    const location = useLocation();
    const userData = location.state.userData;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [blogImage, setBlogImage] = useState();
    const [url, setUrl] = useState("");
    const [progress, setProgrss] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productsRef = ref(database, "blogs");
        const storageRef = sref(storage, blogImage.name);
        const uploadTask = uploadBytesResumable(storageRef, blogImage);
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
                        title: title,
                        content: content,
                        imageUrl: url,
                        publisher: userData.name,
                        publisherImage: userData.displayImage
                    }).then(() => {
                        alert("Upload Complete");
                        setProgrss(false);
                    });
                    setTitle("");
                    setContent("");
                    setBlogImage(null);
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
                        Blog Upload Portal
                    </h1>
                    <hr />
                    <br />
                    <h1 className="text  text-white mb-5 text-center">
                        Effortlessly engage with your customers and grow your business
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
                                        <label htmlFor="title" className="font-bold text-black">
                                            Post Title
                                        </label>
                                    </td>
                                    <td style={{ border: '4px solid black' }}>
                                        <input
                                            type="text"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="border rounded-md px-3 py-2 bg-gray-300 text-black w-full"
                                        />
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style={{ border: '4px solid black' }}>
                                    <label
                                    htmlFor="content"
                                    className="font-bold text-black"
                                >
                                    Post Content
                                </label>
                                    </td>
                                    <td style={{ border: '4px solid black' }}>
                                    <input
                                    type="text"
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className=" border rounded-md px-3 py-2 bg-gray-300 text-black w-full"
                                />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ border: '4px solid black' }}><label htmlFor="blogImage" className="font-bold text-black">
                                    Post Image
                                </label></td>
                                    <td style={{ border: '4px solid black' }}><input
                                    type="file"
                                    id="blogImage"
                                    onChange={(e) => setBlogImage(e.target.files[0])}
                                    className=""
                                    style={{
                                        width: "auto",
                                        maxWidth: "215px",
                                        minWidth: "215px",
                                    }}
                                />
                                {blogImage && (
                                    <img
                                        src={URL.createObjectURL(blogImage)}
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
