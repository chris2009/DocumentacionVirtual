"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert("Passwords do not match");
        }

        const res = await axios.post("/api/auth/register", {
            username: data.username,
            DNI: data.DNI,
            password: data.password,
        });

        if (res.status === 200) {
            router.push("/auth/login");
        }
    });

    return (
        <div className="h-screen flex justify-center items-center bg-kaitoke-green-50">
            <form onSubmit={onSubmit} className="w-1/4 bg-white p-4 rounded">
                <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>

                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
                    Nombre del usuario:
                </label>
                <input
                    type="text"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="yourUser123"
                />

                {errors.username && (
                    <span className="text-red-500 text-xs">
                        {errors.username.message}
                    </span>
                )}

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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="********"
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">
                        {errors.password.message}
                    </span>
                )}

                <label
                    htmlFor="confirmPassword"
                    className="text-slate-500 mb-2 block text-sm"
                >
                    Confirmar contraseña:
                </label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Confirm Password is required",
                        },
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                    placeholder="********"
                />
                {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                    </span>
                )}

                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white p-3 rounded-lg mt-2">
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    );
}
export default RegisterPage;