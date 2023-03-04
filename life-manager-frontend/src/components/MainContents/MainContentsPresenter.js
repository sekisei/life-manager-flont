import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

const MainContentsPresenter = (props) => {

    return (
        <div>
            {!props.isEmpty(props.accounts) && props.accounts.map((val, index) => {
                return(
                    <div className="bg-gray-400 ml-0.5 mr-8 my-0.5 rounded ralative" key = {val.id}>
                        <div className="inline">
                            <input
                                className="w-full text-left pl-1 hover:bg-sky-700"
                                type="button" 
                                value={val.title} onClick = {() => {
                                    props.commonState.setActiveAcId(val.id);
                                    props.navigate("/modify");
                                }}
                            />
                        </div>
                        <TrashIcon
                            className="baseIconStyle inline absolute right-1" 
                            type="button" 
                            value="delete" 
                            onClick = {() => {
                                props.delAccount(val.id);
                                props.getAccounts();
                            }}
                        />
                    </div>
                )
        })}
        </div>
    );
};

export default MainContentsPresenter;