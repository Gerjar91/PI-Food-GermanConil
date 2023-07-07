import React from "react";
import style from "./landingPage.module.css"
import { Link } from 'react-router-dom'; // no esta disponible usenavigate para V5



const LandingPage = () => {



  return (
    <div className={style.container}>
      <div className={style.form}>
        <h1>SINGLE PAGE  <br/>APLICATION</h1>
        <h2>About food</h2>
        <label>User</label>
        <input></input>
        <label>Password</label>
        <input></input>
        <Link className={style.button} to="/homePage">Home</Link>
      </div>
    </div>
  )
}
export default LandingPage;