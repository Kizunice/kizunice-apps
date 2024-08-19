'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {name, email, password } = formValues

  useEffect(() => {
    validateForm();
  }, [name, email, password]);
  // Validate form
  const validateForm = () => {
      let errors = {};

      if (!name) {
          errors.name = 'Name is required.';
      }

      if (!email) {
          errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email is invalid.';
      }

      if (!password) {
          errors.password = 'Password is required.';
      } else if (password.length < 6) {
          errors.password = 'Password must be at least 6 characters.';
      }

      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
  };

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true);
    if(isFormValid) {
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
          toast.success("Berhasil membuat akun!");
          router.push(`/email/verify/`);
        } else {
          setLoading(false);
          if (response.status === 409) {
            toast.error("Akun dengan email ini sudah ada!");
          } else {
            toast.error("Akun dengan email ini sudah ada!");
          }
        }
      } catch (error) {
        setLoading(false);
        console.error("Network Error:", error);
      }
    } else {
      setLoading(false)
      toast.error("Form Error, Silahkan cek kembali");
    }
  }

  const handleChange = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setFormValues({ ...formValues, [name]: value});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-whitegray"
        >
          Nama Lengkap
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
        {/* {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>} */}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-whitegray"
        >
          Email
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
      
      </div>
      {loading ? (
        <button
          disabled
          type="button"
          className="w-full text-white justify-center text-center bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-white justify-center animate-spin"
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
          Mohon tunggu...
        </button>
      ) : (
        <button
          type="submit"
          className="w-full text-white bg-primary hover:bg-tersier focus:ring-4 focus:outline-none focus:ring-tersier font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Daftar
        </button>
      )}
      <p className="text-sm font-light text-gray-400">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline text-white"
        >
          Masuk
        </Link>
      </p>
      <p className="text-sm font-light text-gray-400">
        Daftar akun sensei?{" "}
        <Link
          href="/register/sensei"
          className="font-medium hover:underline text-white"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}