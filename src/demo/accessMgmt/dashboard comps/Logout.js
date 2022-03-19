import { Button } from "antd";

function Logout(props){
    return(
        <Button className="logout_button" onClick={()=>{
            props.setCurrentUser()
            localStorage.clear()
            props.setIsLoggedIn(false)
            
        }} type="danger">Log out</Button>
    )
}

export default Logout