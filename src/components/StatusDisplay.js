import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
export default function StatusDisplay({status}){
    const history=useHistory()
    return(
        <>
        <Button style={{float:"left",margin:"1em"}} variant="primary" onClick={()=>{history.push("/")}}>{`<- Login Page`}</Button><br/><hr/>
        <h1 className="status_text">{status}</h1>
        </>
    )
}