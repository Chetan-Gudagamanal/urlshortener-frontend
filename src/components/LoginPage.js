// import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import logo from "../url-shortener.png"
import { auto } from "@popperjs/core";

export default function LoginPage({setStatus}) {
    const history=useHistory()
    const validationSchema = Yup.object().shape({
        userEmail: Yup.string().email(),
        password: Yup.string()
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = (data) => {
        // console.log(data);
        const loginUser=async()=>{
            const url="https://url-shortener-backend-server.herokuapp.com/login"
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
                    // setStatus("Login Successful")
                    console.log(res)
                    localStorage.setItem("x-auth-token", res)
                    
                    history.push("/homepage")
                })
            }else{
                let jsonData=await rawData.json()
                console.log(jsonData)
                if(jsonData=="Incompleate Registration"){
                    alert("Your previous registration is not completed since Email is not verified, We suggest you to register/create an account again")
                }else{
                    alert("Invalid Credentials")
                }
            }
            
        }
        loginUser()
      };


  return (
    <div className="container">
       
        <div className="row justify-content-center">
        {/* <p>Click on create Account to register as new user</p> */}
        <p><br/><img src={logo} alt="url-shortener" style={{ height: 100, width: auto ,borderRadius:"1em"}}/></p>
        <p className="login_text">LOGIN TO URL SHORTENER APPLICATION</p>
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
                        <br/>
                        <input {...register("userEmail")} placeholder="Enter your email id" />
                        {errors.userEmail && (
                        <span style={{ color: "crimson" }}> {errors.userEmail.message} </span>
                        )}
                        <br />
                        <input
                        {...register("password")}
                        type="password"
                        placeholder="Enter your password"
                        />
                        {errors.password && (
                        <span style={{ color: "crimson" }}> {errors.password.message} </span>
                        )}
                        <br/>

                        <input type="submit" />
                        <br/>
                        <div className="text-center">
                            <button className="route_button forgot_pwd_btn" onClick={()=>{history.push("/forgotPassword")}}>Forgot Password?</button>
                        </div>
                        <br/>
                        <div className="text-center">
                            <button className="route_button" onClick={()=>{history.push("/register")}}>Create an Account!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}