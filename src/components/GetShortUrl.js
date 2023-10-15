import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { url } from "../constants"

export default function GetShortUrl({setStatus}){
    const history=useHistory()
    const {shortUrlToken}=useParams()
    useEffect(()=>{
        const varifyToken=async()=>{
            console.log(shortUrlToken)
            const url=`${url}/short/${shortUrlToken}`
            const rawData=await fetch(url,{
                method:"GET"
            })
            console.log(rawData)
            if(rawData.status==200){
                let jsonData=await rawData.json()
                window.location.href=`${jsonData.longUrl}`
            }else{
                console.log(rawData)
                setStatus(JSON.stringify(rawData))
                history.push("/status")
            }
        }
        varifyToken()
    },[])
    return(
        <>Fetching Data...</>
    )
}