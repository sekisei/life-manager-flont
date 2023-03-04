import axios from "axios";
import React, { useContext, useState } from "react";
import commonURI from "./URIs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CommonStateContext } from "../App";

const Login = (props) => {
    const commonState = useContext(CommonStateContext);
    const [loginStatus, setLoginStatus] = useState("");
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    return(
        <div>
            <form onSubmit = {handleSubmit((data) => {
                axios.post(`${commonURI}/login`, {
                    username: data.userId,
                    password: data.password
                })
                .then(res => {
                    if(res.headers.authorization !== null){
                        //commonState.setUserId(1);
                        sessionStorage.setItem("Token", res.headers.authorization);
                        navigate('/top');
                        console.log(res);
                    }
                }).catch(err => {
                    setLoginStatus("Login failed!");
                });
            })}>
                <div>{loginStatus}</div>
                <div>
                    ID
                    <input {...register("userId")} type="text" />
                </div>
                <div>
                    Password
                    <input {...register("password")} type="password"/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>
            </form>
        </div>
    );
}

export default Login;