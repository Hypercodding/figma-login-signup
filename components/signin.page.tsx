"use client"
import { Formik, Form, Field, useFormik } from "formik"
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
        
import './styles.css';
import Image from "next/image";



export const SigninPage = () => {

    const formik = useFormik({
        initialValues: {
           email: '',
           password: '',
           checkbox: false
          },
        onSubmit:(values)=>{
            console.log(values);
        }
    })

    
    return (
    <>
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
                    <Button type="submit" className="mt-3 border-round-xl w-full flex justify-content-center" style={{backgroundColor: '#304e1a'}}>Sign up</Button>
                </form>

        </div>

        <div >
        <p className="flex justify-content-center mt-3">or</p>
            <div className="flex gap-5 mt-6 ">
                
                <Button className="border-round-xl w-100 flex justify-content-center " style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', fontSize: "0.9rem"}}>
                <Image
                    src="/google.png"
                    width={20}
                    height={20}
                    alt="aple"
                    
                    />
                    Sign in with Google
                    </Button>
                <Button className="border-round-xl w-100 flex justify-content-center "  style={{backgroundColor: 'white', color: 'black', border: '1px solid grey', textSizeAdjust: "auto",fontSize: "0.9rem"}}>
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
            <h4>Dont have an account? <a href="/">Sign Up</a></h4>
            </div>
        </div>

    </div>
    </>
  )
}
