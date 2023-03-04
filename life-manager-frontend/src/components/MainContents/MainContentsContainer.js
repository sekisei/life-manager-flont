import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import commonURI from "../URIs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonStateContext } from "../../App";
import MainContentsPresenter from "./MainContentsPresenter";

const MainContentsContainer = (props) => {
    const commonState = useContext(CommonStateContext);
    const navigate = useNavigate();

    // アカウントの削除
    const delAccount = (acId) => {
        axios.post(
            `${commonURI}/v1/users/${commonState.userId}/accounts/${acId}`,
            {},
            {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し            
        ).then(
            res => {
                props.getAccounts();
            }
        );
    };

    const isEmpty = (data) => {
        if(Object.keys(data).length === 0){
            return true;
        }else if(Object.keys(data).length > 0){
            return false;
        };
    };

    const newProps = {
        ...props,
        commonState,
        navigate,
        accounts: props.accounts,
        getAccounts: props.getAccounts,
        delAccount,
        isEmpty
    };

    return(
        <div>
            <MainContentsPresenter {...newProps}/>
            <div className="m-1">
                <PlusIcon
                    className="baseIconStyle inline mb-1 mr-1" 
                    type="button" 
                    value="Add" onClick={() => {
                        navigate('/modify');
                    }}
                />
                <input className="baseInputBoxStyle inline" type="text"/>
            </div>
        </div>
    );
};

export default MainContentsContainer;