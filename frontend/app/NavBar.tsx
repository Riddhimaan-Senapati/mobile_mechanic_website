'use client'
import {useRouter} from "next/navigation"; 

function LoginButton(){
    const router = useRouter(); 
    const goto_login = () => {
        router.push("/customer_landing"); 
    }

    return(
    <button className = "navButton" onClick={goto_login}>Log In</button>
    ); 
}

function HomeButton(){
    const router = useRouter(); 
    const goto_home = () => {
        router.push("/"); 
    }

  return(
    <button className = "navButton" onClick={goto_home}>Mobile Mechanic</button>
  ); 
}

export default function NavBar(){
  return (
    <div className = "navBar">
        <HomeButton />
        <LoginButton />
      </div>
  ); 
}