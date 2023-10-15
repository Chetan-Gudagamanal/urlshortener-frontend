
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { url, url } from "../constants";

export default function UrlGeneratePage({setStatus}) {
    const [shortUrlStatus, setShortUrlStatus]=useState(``)
    const history=useHistory()

    //Check weather user is authorized or not
    useEffect(()=>{
        const checkAuthorized=async()=>{
            const url=`${url}/check_authorized`
            const rawData=await fetch(url,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${localStorage.getItem("x-auth-token")}`
                }
            })
            if(rawData.status==200){
                console.log("success")
            }else{
                const jsonData=await rawData.json()
                if(jsonData=="JsonWebTokenError"){
                    history.push("/login")
                    alert("Your Session has been Expired, Kindly Login again")
                }  
            }
        }
        checkAuthorized()
    },[])
    const validationSchema = Yup.object().shape({
        longUrl: Yup.string().url()
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({ resolver: yupResolver(validationSchema) });
    
      const onSubmit = (data) => {
        console.log(data);
        const getShortUrl=async()=>{
            const url=`${url}/url_shortener`
            const rawData=await fetch(url,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${localStorage.getItem("x-auth-token")}`
                },
                body: JSON.stringify(data)
            })
            if(rawData.status==200){
                let jsonData=await rawData.json()
                setShortUrlStatus(jsonData.shortUrl)
                // .then(res=>{
                //     setShortUrlStatus(jsonData.shortUrl)
                // })
            }else{
                const jsonData=await rawData.json()
                if(jsonData=="JsonWebTokenError"){
                    history.push("/login")
                    alert("Your Session has been Expired, Kindly Login again")
                }else{
                    setShortUrlStatus(JSON.stringify(rawData))
                    console.log(rawData)
                }
                
            }
        }
        getShortUrl()
      };


  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <br/>
                <p className="url_shortener_title">Hi.. Let me know if you want to shorten any long URL!!!</p>
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="MyForm">
                        <br/>
                        <input {...register("longUrl")} placeholder="Enter the URL to be shortened" />
                        {errors.longUrl && (
                        <span style={{ color: "crimson" }}> {errors.longUrl.message} </span>
                        )}
                        <br />

                        <input type="submit" value="Generate Short URL"/>
                        <br/> 
                    </form>
                </div>
                {console.log(shortUrlStatus)}
                <p>Once Short link is generated, it will be shown below.</p><br/>
                <a href={shortUrlStatus} target="_blank">{shortUrlStatus}</a>
            </div>
        </div>
    </div>
  );
}