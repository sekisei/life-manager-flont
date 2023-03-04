import { useForm } from "react-hook-form";

const AccountFormPresenter = (props) => {
    const {register, handleSubmit} = useForm();
    const submitItems = (data) => {
        props.addItems({           
            itemType: data.itemType,
            itemValue: data.itemValue,
        }, 0);
    }
    const submitAccount = (data) => {
        props.addAccount(data.acTitle);
        props.setIsEnabledCreateAcList(false);
    }
    return (
        <> 
            <form onSubmit = {handleSubmit(submitItems)}>
                <div>
                    <select {...register("itemType")}>
                        <option value="tel">電話番号</option>
                        <option value="email">メール</option>
                        <option value="password">パスワード</option>
                        <option value="text">メモ</option>
                    </select>
                    <input type = "submit" value = "change"/>
                </div>
                <div>
                    <input
                        {...register("itemValue")} 
                        type = {props.items.itemType} 
                        defaultValue = {props.items.itemValue}
                    />
                </div>
            </form>
            <form onSubmit = {handleSubmit(submitAccount)}>
                <input {...register("acTitle")} type = 'text' />
                <input type = "submit" value = "Done"/>
                <input type = "button" value = "Cancel" onClick={() => {props.setIsEnabledCreateAcList(false)}}/>
            </form>
        </>
    );
}

export default AccountFormPresenter;