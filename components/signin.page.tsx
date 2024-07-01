"use client"
import { useFormik } from "formik";
import { Button } from 'primereact/button';
import { useMutation } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import './styles.css';
import Image from "next/image";
import EmailInput from "@/components/FormElements/EmailInput";
import PasswordInput from "@/components/FormElements/PasswordInput";
import ToastComponents from "./ToastComponents";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    password: string;
}

const useLoginValidation = () => {
    return useMutation(async (user: User) => {
        const response = await axios.post('http://127.0.0.1:8000/users/user-login', user);
        return response.data;
    });
}

export const SigninPage = () => {
    const { toast, showError, showSuccess } = ToastComponents();
    const loginValidation = useLoginValidation();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                if (!values.email || !values.password) {
                    throw new Error("Please fill out the email and password fields!");
                }
                await loginValidation.mutateAsync(values);
                showSuccess("Logged in Successfully");
                router.push("/home");
                formik.resetForm();
            } catch (error) {
                console.error("Error logging in:", error);
                showError( "Wrong Credentials");
            }
        }
    });

    return (
        <>
            <Toast ref={toast} />
            <div className="mt-6">
                <div className="login-box">
                    <h1 className="heading">Welcome back!</h1>
                    <p className="">Enter your Credentials to access your account</p>
                    <form onSubmit={formik.handleSubmit}>
                        <EmailInput
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <PasswordInput
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Button type="submit" className="mt-3 border-round-xl w-full flex justify-content-center" style={{ backgroundColor: '#304e1a' }}>Sign in</Button>
                    </form>
                </div>

                <div>
                    <p className="flex justify-content-center mt-3">or</p>
                    <div className="flex gap-5 mt-6">
                        <Button className="border-round-xl w-100 flex justify-content-center gap-2" style={{ backgroundColor: 'white', color: 'black', border: '1px solid grey', fontSize: "0.9rem" }}>
                            <Image
                                src="/google.png"
                                width={20}
                                height={20}
                                alt="Google"
                            />
                            Sign in with Google
                        </Button>
                        <Button className="border-round-xl w-100 flex justify-content-center gap-2" style={{ backgroundColor: 'white', color: 'black', border: '1px solid grey', textSizeAdjust: "auto", fontSize: "0.9rem" }}>
                            <Image
                                src="/apple.png"
                                width={20}
                                height={20}
                                alt="Apple"
                            />
                            Sign in with Apple
                        </Button>
                    </div>
                    <div className="flex justify-content-center mt-3">
                        <h4>Don&apos;t have an account? <a href="/">Sign Up</a></h4>
                    </div>
                </div>
            </div>
        </>
    );
}
