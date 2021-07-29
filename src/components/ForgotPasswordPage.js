import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function ForgotPasswordPage({setStatus}) {
    const history=useHistory()
    const validationSchema = Yup.object().shape({
        userEmail: Yup.string().email()
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = (data) => {
        console.log(data);
        const getResetLink=async()=>{
            const url="https://url-shortener-backend-server.herokuapp.com/forgot_password"
            const rawData=await fetch(url,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(rawData.status==200){
                let jsonData=await rawData.json()
                .then(res=>{
                    setStatus("Reset Password Link has been sent to your email Id, The link will be valid only for 10 minutes(If not found, Kindly also check in spam folder)")
                    history.push("/status")
                })
            }else if(rawData.status==500){
                let jsonData=await rawData.json();
                if(jsonData=="Invalid User"){
                    alert("Invalid UserName")
                }else{
                    setStatus(JSON.stringify(jsonData))
                    history.push("/status")
                    console.log(jsonData)
                } 
            }else{
                setStatus(JSON.stringify(rawData))
                history.push("/status")
                console.log(rawData)
            }
        }
        getResetLink()
      };


  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
                        <br/>
                        <input {...register("userEmail")} placeholder="Enter your email id" />
                        {errors.userEmail && (
                        <span style={{ color: "crimson" }}> {errors.userEmail.message} </span>
                        )}
                        <br />

                        <input type="submit" value="Get Password Reset Link"/>
                        <br/>
                        <div className="text-center">
                            <button className="route_button" onClick={()=>{history.push("/")}}>Go to Login Page</button>
                        </div>
                        
                    </form>
                    {/* <div className="text-center">
                            <button className="large" >Forgot Password?</button>
                    </div>
                    <br/>
                    <div className="text-center">
                        <button className="large" onClick={()=>{history.push("/register")}}>Create an Account!</button>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}