import Image from "next/image";
'use client'
//checking branch if it's working

function LoginButton(){
  const goto_login = () => {
    return <Login Page />
  }

  return(
    <button onClick={goto_login}>Log In</button>
  ); 
}

export default function Home() {
  return (
    <div>
      <h1> Are we in your area? </h1>
      <LoginButton />
    </div>
  );
}