import React from 'react'
import Aside from './Aside'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
function Contact() {
    const location = useLocation();
    const userData = location.state.userData;
    console.log(userData);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, phoneNumber, message } = formData;

        const mailtoLink = `mailto:siddharthamukherjee0709@gmail.com?subject=New Message&body=First Name: ${firstName}%0D%0ALast Name: ${lastName}%0D%0AEmail: ${email}%0D%0APhone Number: ${phoneNumber}%0D%0AMessage: ${message}`;
        window.location.href = mailtoLink;
    };
    return (
        <>
            <Aside userData={userData} />
            <div className="">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center  lg:grid-cols-2">
                        {/* contact from */}
                        <div className="flex items-center justify-center">
                            <div className="">
                                <p className="text-2xl font-bold text-gray-900 md:text-4xl">Get in touch</p>
                                <p className="mt-4 text-lg text-gray-600">
                                    Our friendly team would love to hear from you.
                                </p>
                                <form action="" className="mt-8 space-y-4">
                                    <div className="grid w-full gap-y-4 md:gap-x-4 lg:grid-cols-2">
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="first_name"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="first_name"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                name="firstName"
                                            />
                                        </div>
                                        <div className="grid w-full  items-center gap-1.5">
                                            <label
                                                className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="last_name"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                                type="text"
                                                id="last_name"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                name="lastName"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="text"
                                            id="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="phone_number"
                                        >
                                            Phone number
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            type="tel"
                                            id="phone_number"
                                            placeholder="Phone number"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            name="phoneNumber"
                                        />
                                    </div>
                                    <div className="grid w-full  items-center gap-1.5">
                                        <label
                                            className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                            id="message"
                                            placeholder="Leave us a message"
                                            cols={3}
                                            value={formData.message}
                                            onChange={handleChange}
                                            name="message"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        onClick={handleSubmit}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                        <img
                            alt="Contact us"
                            className="hidden max-h-full w-full rounded-lg object-cover lg:block mt-3"
                            src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=800&q=80"
                        />
                    </div>
                </div>
            </div>
            <hr className="mt-6" />
        </>
    )
}

export default Contact