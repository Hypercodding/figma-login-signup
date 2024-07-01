"use client"
import {  useFormik } from "formik"
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";

        
import './styles.css';
import Image from "next/image";

interface User {
    email: string;
    password: string
}

const useLoginValidation = ()=>{
    return useMutation(async(user: User)=>{
        const response = await axios.post('http://127.0.0.1:8000/users/user-login', user);
        return response.data;
    })
}

export const SigninPage = () => {
    const toast: any = useRef(null);
    const showSuccess = (message: string) => {
        toast.current.show({severity:'success', summary: 'Success', detail:message, life: 3000});
    }

    const showError = (message: string) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message, life: 3000});
    }
 
    const loginValidation = useLoginValidation();
    const queryClient = useQueryClient();

    const formik = useFormik({
        initialValues: {
           email: '',
           password: '',
          },
        onSubmit:async (values)=>{
            try{
                console.log(values);
                await loginValidation.mutateAsync(values);
                showSuccess("Logged in Successfully")
                formik.resetForm()
            }     
            catch(error){
                console.error("Error adding user:", error);
                showError("Wrong Credentials")
            }
        }
    })

    
    return (
    <>
    <Toast ref={toast} />
    <div className=" mt-6">
        <div className="login-box">
            <h1 className="heading">Welcome back!</h1>
            <p className="">Enter your Credentials to access your account</p>
                <form onSubmit={formik.handleSubmit}>
                   
                    <div className="flex flex-column gap-2 mt-6">
                        <label htmlFor="email"><b>Email address</b></label>
                        <InputText 
                        placeholder="email@mail.com"
                        id="email" 
                        aria-describedby="email-help" 
                        className="border-round-xl" 
                        
                        {...formik.getFieldProps('email')}
                        />
                        
                    </div>
                    <div className="flex flex-column gap-2 border-round-xl mt-3">
                    <label htmlFor="password" className="flex align-items-center justify-content-between">
                            <b>Password</b>
                            <a href="#" className="forgot-password-link" style={{fontSize: "0.7rem"}}>Forgot Password</a>
                        </label>
                        <div className="border-round-xl">
                        <Password
                        placeholder="password"
                            id="password"
                            name="password"
                            aria-describedby="password-help"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            inputStyle={{borderRadius: "0.75rem", width: "100%"}} style={{borderRadius: "0.75rem", width: "100% "}}
                            feedback={false}
                        />
                        </div>
                    </div>
                    
                    <Button type="submit" className="mt-3 border-round-xl w-full flex justify-content-center" style={{backgroundColor: '#304e1a'}}>Sign in</Button>
                </form>

        </div>

        <div >
        <p className="flex justify-content-center mt-3">or</p>
            <div className="flex gap-5 mt-6 ">
                
                <Button className="border-round-xl w-100 flex justify-content-center gap-2 " style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', fontSize: "0.9rem"}}>
                <Image
                    src="/google.png"
                    width={20}
                    height={20}
                    alt="aple"
                    
                    />
                    Sign in with Google
                    </Button>
                <Button className="border-round-xl w-100 flex justify-content-center gap-2 "  style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', textSizeAdjust: "auto",fontSize: "0.9rem"}}>
                <Image
                    src="/apple.png"
                    width={20}
                    height={20}
                    alt="aple"
                    
                    />
                    <p>Sign in with Apple</p>
                </Button>
                
            </div>
            <div className="flex justify-content-center mt-3">
            <h4>Dont have an account? <a href="/">Sign Up</a></h4>
            </div>
        </div>

    </div>
    </>
  )
}
