import axios from "axios";
import { useContext, useMemo, useState } from "react";
import commonURI from "../../URIs";
import { CommonStateContext } from "../../App";
import AccountFormPresenter from "./AccountFormPresenter";

const AccountFormContainer = () => {
    const context = useContext(CommonStateContext);
    //const [items, setItems] = useState({userId:context.userId, acId: context.acId, sortOrderNumber: 0, itemType: "password", itemValue: ""});
    const [items, setItems] = useState({itemType: "tel", itemValue: ""});

    // アカウントの登録
    const addAccount = (acTitle) => {
        //"http://localhost:8080/v1/users/accounts"
        axios.post(
            `${commonURI}/v1/users/accounts`, 
            {
                userId: context.userId,
                acTitle: acTitle
            },
            {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
        ).then(
        res => {
            //context.setIsEnabledCreateAcList(false);
            console.log(res);
        });
    }
    
    // アイテムの取得
    const getItems = (acId) => {
        //`http://localhost:8080/v1/users/${context.userId}/accounts/${acId}/items`
        axios.get(
            `${commonURI}/v1/users/${context.userId}/accounts/${acId}/items`,
            {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
        ).then(
            res => {
                console.log(JSON.stringify(res));
                setItems(res.data);
            }
        );
    }

    //アイテムの登録
    const addItems = (items, acId) => {
        const data = {
            userId: items.userId, 
            acId: items.acId,
            itemType: items.itemType,
            itemValue: items.itemValue,
            sortOrderNumber: items.sortOrderNumber
        }
        axios.post(
            `${commonURI}/v1/users/${context.userId}/accounts/${acId}/items`, 
            data,
            {headers: {"Authorization": sessionStorage.getItem("Token")}} //TODO トークン保存場所見直し
        ).then(res => {
            setItems(data);
            console.log(res);
        });
    }

    const checkItems = useMemo(() => {
        context.activeAcId != null && getItems(context.userId, context.activeAcId);
    }, [context.activeAcId]);

    return(
        <>
            {context.isEnabledCreateAcList && <AccountFormPresenter 
                getItems = {getItems}
                addAccount = {addAccount}
                addItems = {addItems}
                setIsEnabledCreateAcList = {context.setIsEnabledCreateAcList}
                activeAcId = {context.activeAcId}
                items = {items}
            />}
        </>
    );
}

export default AccountFormContainer;