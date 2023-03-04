import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonStateContext } from "../../App";
import commonURI from "../URIs";
import ManageAccountPresenter from "./ManageAccountPresenter";

const ManageAccountContainer = (props) => {
    const commonState = useContext(CommonStateContext);
    const navigate = useNavigate();
    const useFormState = useForm();
    const useFieldArrayState = useFieldArray({ 
        control: useFormState.control,
        name: "fieldarray",
    });

    const [account, setAccount] = useState({title: ""});

    // アカウントの登録
    const submitAccount = (data) => {
        const userAccountItems = {};
        data.fieldarray.map((item, index) => {
            userAccountItems[index] = {
                id: null,
                itemType: item.itemType,
                itemValue: item.itemValue,
                sortOrderNumber: 0,
                userAccount: null,
                users: null
            };
        });
        const postData = {
            account: {
                id: null,
                title: data.title,
                userAccountItems: Object.values(userAccountItems)
        }};
        axios.post(
            `${commonURI}/v1/users/${commonState.userId}/accounts`, 
            postData,
            {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
        ).then(res => {
            console.log(res);
            props.getAccounts();
            commonState.setActiveAcId(null);
            navigate("/top");
        });
    };

    useEffect(() => {
        if(commonState.activeAcId != null){
            axios.get(
                `${commonURI}/v1/users/${commonState.userId}/accounts/${commonState.activeAcId}`,
                {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
            ).then(
                res => {
                    setAccount({...res.data});
                }
            );
        };
    },[commonState.activeAcId]);

    const newProps = {
        ...props, 
        commonState,
        navigate,
        submitAccount,
        account,
        useFormState,
        useFieldArrayState
    };

    return(
        <>
            <Outlet />
            <ManageAccountPresenter {...newProps} />
        </>
    );
};

export default ManageAccountContainer;