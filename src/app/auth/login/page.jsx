"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/navigation'
import {useState} from 'react'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter()
  const [error, setError] = useState(null)
  
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      DNI: data.DNI,
      password: data.password,
      redirect: false,
    });

    console.log(res)
    if (res.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  });

  return (
    <div className="h-screen flex justify-center items-center bg-kaitoke-green-50">
      <form onSubmit={onSubmit} className="w-1/4 bg-white p-4 rounded">

        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
        )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="DNI" className="text-slate-500 mb-2 block text-sm">
          DNI:
        </label>
        <input
          type="text"
          {...register("DNI", {
            required: {
              value: true,
              message: "DNI is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-kaitoke-green-50 text-slate-700 w-full"
          placeholder="Ingrese DNI"
        />

        {errors.DNI && (
          <span className="text-red-500 text-xs">{errors.DNI.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-kaitoke-green-50 text-gray-700 w-full"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="w-full bg-kaitoke-green-500 hover:bg-kaitoke-green-600 text-white p-3 rounded-lg mt-2">
          Ingresar
        </button>
      </form>
    </div>
  );
}
export default LoginPage;