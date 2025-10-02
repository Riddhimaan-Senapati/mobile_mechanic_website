'use client'

import Image from "next/image";
import NavBar from "./NavBar"; 

//checking branch if it's working

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