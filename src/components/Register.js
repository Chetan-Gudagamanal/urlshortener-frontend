import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export default function Register({setStatus}) {
    const history=useHistory()
    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        userEmail: Yup.string().email(),
        password: Yup.string().min(8, "Password at least 8 chars"),
        confrimPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Password must match"
        )
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = (data) => {
        // console.log(data);
        const registerUser=async()=>{
            const url="https://url-shortener-backend-server.herokuapp.com/register"
            const rawData=await fetch(url,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            let jsonData=await rawData.json();
            // console.log(jsonData)
            if(jsonData._id){
                alert("created successfully")
                // setStatus("User created successfully, You can now Login with your credentials")
                setStatus("We have sent an verification link to your email, kindly verify to continue.(This link will be valid for only 10 minutes, If not found, kindly check in spam folder also)")
                history.push("/status")
            } else{
                alert(jsonData)
            }
        }
        registerUser()
      };


  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
                        <br/>
                        <input {...register("firstName")} placeholder="Enter First Name" />
                        {errors.firstName && (
                        <span style={{ color: "crimson" }}> {errors.firstName.message} </span>
                        )}
                        <br />
                        <input {...register("lastName")} placeholder="Enter Last Name" />
                        {errors.lastName && (
                        <span style={{ color: "crimson" }}> {errors.lastName.message} </span>
                        )}
                        <br />
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
                    
                </div>
            </div>
        </div>
    </div>
  );
}