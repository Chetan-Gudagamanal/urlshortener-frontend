import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { backend_url } from "../constants";

export default function ChangePasswordPage({setStatus}) {
    const history=useHistory()
    const {id,token}=useParams()
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string().min(8, "Password at least 8 chars"),
        confrimPassword: Yup.string().oneOf(
          [Yup.ref("newPassword"), null],
          "Password must match"
        )
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = (data) => {
        console.log(data);
        const changePassword=async()=>{
            const url=`${backend_url}/change_password/${id}/${token}`
            const rawData=await fetch(url,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            console.log(rawData)
            if(rawData.status==200){
                let jsonData=await rawData.json()
                .then(res=>{
                    setStatus("your Password has been reset Successfully, You can login with your new password now")
                    history.push("/status")
                })
            }else if(rawData.status==500){
                let jsonData=await rawData.json();
                if(jsonData.message=="jwt expired"){
                    alert("Password Reset timeLimit expired, pls try with new reset Link...")
                    setStatus("Password Reset timeLimit expired, pls try with new reset Link...")
                    history.push("/status")
                }else if(jsonData.message=="invalid token"){
                    console.log("Invalid Token")
                    setStatus("Invalid Token")
                    history.push("/status")
                }else{
                    console.log(jsonData)
                    setStatus(JSON.stringify(jsonData))
                    history.push("/status")
                }
            }else{
                console.log(rawData)
                setStatus(JSON.stringify(rawData))
                history.push("/status")
            }
        }
        changePassword()
      };


  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
                        <br/>
                        
                        <input
                        {...register("newPassword")}
                        type="password"
                        placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                        <span style={{ color: "crimson" }}> {errors.newPassword.message} </span>
                        )}
                        <br/>

                        <input
                        {...register("confrimPassword")}
                        type="password"
                        placeholder="Confirm password"
                        />
                        {errors.confrimPassword && (
                        <span style={{ color: "crimson" }}>
                            {errors.confrimPassword.message}
                        </span>
                        )}
                        <br/>

                        <input type="submit" />
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