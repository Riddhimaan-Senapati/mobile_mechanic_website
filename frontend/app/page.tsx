import Image from "next/image";
'use client'
//checking branch if it's working

function LoginButton(){
  const goto_login = () => {
    return <LoginPage />
  }

  return(
    <button onClick={goto_login}>Log In</button>
  ); 
}

function HomeButton(){
  const goto_home = () => {
    return <Home />
  }

  return(
    <button onClick={goto_home}> Mobile Mechanic </button>
  ); 
}

function NavBar(){
  return (
    <div>
        <HomeButton />
        <LoginButton />
      </div>
  ); 
}

export default function Home() {
  return (
    <div>
      <NavBar />

      <div>
        <h1> Are we in your area? </h1>
      </div>
      
    </div>
  );
}