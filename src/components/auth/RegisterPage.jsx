'use client'

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export default function RegisterForm() {
  const router = useRouter()

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true);
    setFormValues({ name: "", email: "", password: "" });
    console.log(formValues)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      if (response.ok) {
        setLoading(false);
        toast.success("User Created Successfully");
        router.push("/login");
      } else {
        setLoading(false);
        if (response.status === 409) {
          setEmailErr("User with this Email already exists");
          toast.error("User with this Email already exists");
        } else {
          toast.error("Oops Something Went wrong");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
    }
  }

  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setFormValues({ ...formValues, [name]: value});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toaster />
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-whitegray"
        >
          Your name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-white border border-white text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          placeholder="John Doe"
          value={formValues.name}
          onChange={handleChange}
        />
        {/* {errors.name && (
          <small className="text-red-600 text-sm ">
            This field is required
          </small>
        )} */}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-whitegray"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-white border border-white text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          placeholder="name@company.com"
          value={formValues.email}
          onChange={handleChange}
        />
        {/* {errors.email && (
          <small className="text-red-600 text-sm ">
            This field is required
          </small>
        )} */}
        {/* <small className="text-red-600 text-sm ">{emailErr}</small> */}
      </div>
      <div className='my-2'>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-whitegray"
        >
          Password
        </label>
        <input
          // {...register("password", { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-white border border-white text-black sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          value={formValues.password}
          onChange={handleChange}
        />
        {/* {errors.password && (
          <small className="text-red-600 text-sm ">
            This field is required
          </small>
        )} */}
      </div>
      {loading ? (
        <button
          disabled
          type="button"
          className="w-full text-white text-center bg-primary pt-4 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Creating please wait...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Sign Up
        </button>
      )}
    
      <p className="text-sm font-light text-gray-500 text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline text-primary"
        >
          Login
        </Link>
      </p>
    </form>
  );
}