import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import DisplayAllUrls from "./DisplayAllUrls"
import { backend_url } from "../constants"

export default function AllUrlData(){
    const [urlData,setUrlData]=useState([])
    const history= useHistory()
    // useEffect(()=>{
    //     fetchAllUrlData()
    // },[])
    //Check weather user is authorized or not And then fetch data
    useEffect(()=>{
        const checkAuthorized=async()=>{
            const url=`${backend_url}/check_authorized`
            const rawData=await fetch(url,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": `${localStorage.getItem("x-auth-token")}`
                }
            })
            if(rawData.status==200){
                console.log("success");
                fetchAllUrlData()
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
    async function fetchAllUrlData(){
        fetch(`${backend_url}/allShortUrls`, {
          method: "GET",
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            setUrlData(res);
        });
    }
    return(
        <>
            <DisplayAllUrls inputData={urlData}/>
        </>
    )
}