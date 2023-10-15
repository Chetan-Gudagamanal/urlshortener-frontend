import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { backend_url } from "../constants"

export default function VerifyEmailPage({useParams,setStatus}){
    const {id,token}=useParams()
    const history=useHistory()
    //when reset_password page is loaded it will just verify token and it will redirect user to change_passord page through useEffect
    useEffect(()=>{
        // console.log(data);
        const varifyToken=async()=>{
            const url=`${backend_url}/verify_email/${id}/${token}`
            const rawData=await fetch(url,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(rawData)
            if(rawData.status==200){
                let jsonData=await rawData.json()
                .then(res=>{
                    setStatus("Your email verification successful, You can now Login to App")
                    history.push(`/status`)
                })
            }else if(rawData.status==500){
                let jsonData=await rawData.json();
                if(jsonData.message=="jwt expired"){
                    alert("This Link expired, plese try again")
                    setStatus("This Link expired")
                    history.push("/status")
                }else if(jsonData.message=="invalid token"){
                    console.log("Invalid Token")
                    setStatus("Invalid Token")
                    history.push("/status")
                }else{
                    console.log(JSON.stringify(jsonData))
                    setStatus(JSON.stringify(jsonData))
                    history.push("/status")
                }
            }else{
                console.log(rawData)
                setStatus(JSON.stringify(rawData))
                history.push("/status")
            }
        }
        varifyToken()
    },[])
    return(
        <>Kindly Wait, Until we verify your email...</>
    )
}