"use client"
import { useFormik } from "formik"
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import Image from "next/image";
import axios from "axios";
import EmailInput from "@/components/FormElements/EmailInput";
import PasswordInput from "@/components/FormElements/PasswordInput";
import NameInput from "@/components/FormElements/NameInput";
import './styles.css';
import ToastComponents from "./ToastComponents";
import * as Yup from 'yup';


//
interface User{
    name: string;
    email: string;
    password: string
}

const useAddUse =() => {
    return useMutation(async (user:User)=>{
    const response = await axios.post('https://boilerplate-backend-python-production.up.railway.app/users/', user);
    return response.data;
});
};

export const LoginPage = () => {
   const {showError, toast, showSuccess} = ToastComponents();

   const signupSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
  .required('Password is required.')
  .min(8, 'Password must be at least 8 characters.')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
  .matches(/[0-9]/, 'Password must contain at least one number.')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.')

   })

    const addUser = useAddUse();
    const formik = useFormik({
        initialValues: {
           name: '',
           email: '',
           password: '',
           checkbox: false
          },
          validationSchema: signupSchema,
          
        onSubmit:async (values)=>{
            if (!values.checkbox) {
                showError("Please agree to the terms & policy");
                return;
              }
            try {
                await addUser.mutateAsync(values); // Use mutateAsync for async mutations
                showSuccess('User added successfully');
                formik.resetForm(); // Reset form after successful submission
            } catch (error) {
                console.error("Error adding user:", error);
                showError('Failed to add user');
            }
        }
    })

    const { errors, touched} = formik;

    return (
    <>
    <Toast ref={toast} />
    <div className=" mt-6">
        <div className="login-box">
            <h1 className="heading">Sign Up</h1>
                <form onSubmit={formik.handleSubmit}>
                        <NameInput
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                              {errors.name && touched.name && <span style={{color: "red"}}>{errors.name}</span>}

                    <EmailInput
                         id="email"
                         value={formik.values.email}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                    />
                          {errors.email && touched.email && <span style={{color: "red"}}>{errors.email}</span>}

                    <PasswordInput
                        id="password"
                        name="password"
                        value={formik.values.password}
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         showForgotPassword= {false}
                    />
                   {errors.password && touched.password && <span style={{color: "red"}}>{errors.password}</span>}

                    <div className="flex align-items-center mt-2">
                            <Checkbox 
                                inputId="checkbox" 
                                name="checkbox" 
                                checked={formik.values.checkbox} 
                                onChange={(e) => formik.setFieldValue('checkbox', e.checked)
                                
                                }
                            />
                            <label htmlFor="checkbox" className="ml-2">I agree to the <a href="" style={{color: 'black'}}>terms & policy</a></label>
                        </div>
                    <Button 
                        type="submit" 
                        className="mt-3 border-round-xl w-full flex justify-content-center" 
                        style={{backgroundColor: '#304e1a'}}>
                    Sign up
                    </Button>
                </form>

        </div>

        <div >
        <p className="flex justify-content-center mt-3">or</p>
            <div className="flex gap-5 mt-3 ">
                
                <Button className="border-round-xl w-100 flex justify-content-center gap-2" style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', fontSize: "0.9rem"}}>
                <Image
                    src="/google.png"
                    width={20}
                    height={20}
                    alt="aple"
                    
                    />
                    Sign in with Google
                    </Button>
                <Button className="border-round-xl w-100 flex justify-content-center gap-2"  style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', textSizeAdjust: "auto",fontSize: "0.9rem"}}>
                <Image
                    src="/apple.png"
                    width={20}
                    height={20}
                    alt="aple"
                    
                    />
                    Sign in with Apple
                </Button>
                
            </div>
            <div className="flex justify-content-center mt-3">
            <h4>Have an account? <a href="/signin">Sign In</a></h4>
            </div>
        </div>

    </div>
    </>
  )
}
