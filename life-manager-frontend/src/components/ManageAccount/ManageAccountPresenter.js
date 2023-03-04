import { useEffect, useState } from "react";
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
//import "..ManageAccount/";

const ManageAccountPresenter = (props) => {

    const {register, handleSubmit, reset, control, getValues, setValue} = {...props.useFormState};
    const {fields, append, remove, update} = {...props.useFieldArrayState};

    useEffect(() => {
        if(props.account.userAccountItems !== undefined){
            props.account.userAccountItems.map((item, index) => {
                update(index, {...item});
            });
            reset({...getValues(), title: props.account.title});
        }
    },[props.account]);

    return (
        <div className="m-1 flex justify-center"> 
            <form
                onSubmit = {handleSubmit(data => {
                    props.submitAccount(data);
                })}
            >
                <div>
                    Title
                    <input
                        className="baseInputBoxStyle my-5"
                        {...register(
                            "title"
                        )}
                        type = 'text'
                    />
                </div>
                <div className="inline">
                    {fields.map((item, index) => {
                        return(
                            <div key={item.id}>
                                <div>
                                    <select 
                                        {...register(
                                            `fieldarray.${index}.itemType`,
                                            {onChange: (e) => update(index, {
                                                ...item,
                                                itemType: e.target.value,
                                            })}
                                        )}
                                        type = {item.itemType}
                                    >
                                        <option value="tel">電話番号</option>
                                        <option value="email">メール</option>
                                        <option value="password">パスワード</option>
                                        <option value="text">メモ</option>
                                    </select>
                                </div>
                                <div className="rounded ralative">
                                    <div className="inline">
                                        <input
                                            className="baseInputBoxStyle mr-1"
                                            {...register(
                                                `fieldarray.${index}.itemValue`,
                                            )}
                                            type = {item.itemType}
                                        />
                                    </div>
                                    <TrashIcon 
                                        className="baseIconStyle inline absolute r-1"
                                        type="button" 
                                        onClick={() => remove(index)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <input className="baseButtonStyle m-1" type = "submit" value = "complete"/>
                    <input 
                        className="baseButtonStyle m-1"
                        type = "button" 
                        value = "Cancel" 
                        onClick={() => {
                            props.commonState.setActiveAcId(null);
                            props.navigate("/top");
                        }}
                    />
                    <PlusIcon
                        className="inline baseIconStyle mb-1"
                        type="button"
                        onClick={() => append({
                            itemType: "tel",
                            itemValue: "",
                            sortOrderNumber: 0,
                        })} //Append defult value
                    />
                    </div>
            </form>
        </div>
    );
};

export default ManageAccountPresenter;