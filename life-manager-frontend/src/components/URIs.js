
/*
class URIManager {
    
    construnctor(userId, accountId, itemId){
        this.userId = userId;
        this.accountId = accountId;
        this.itemId = itemId;        
    };

    common = {
        //プロトコル
        protocol: "http",
    
        //ホスト
        host: "localhost:8080",
    };
    
    users = () => {
        return `${common.protocol}://${common.host}/v1/users`;
    }
    
    specificUser = () => {
        return `${common.protocol}://${common.host}/v1/users/${userId}`;
    }
    
    accounts = () => {
        return `${common.protocol}://${common.host}/v1/users/${userId}/accounts`;
    }
    
    specificAccount = () => {
        return `${common.protocol}://${common.host}/v1/users/${userId}/accounts/${accountId}`;
    }
    
    items = () => {
        return `${common.protocol}://${common.host}/v1/users/${userId}/accounts/${accountId}/items`;
    }
    
    specificItems = () => {
        return `${common.protocol}://${common.host}/v1/users/${userId}/accounts/${accountId}/items/${itemId}`;
    }
    
    //トークン取得・ログイン
    login = () => {
        return `${common.protocol}://${common.host}/login`;
    }
}
*/

//プロトコル
const protocol = "http";

//ホスト
const host = "localhost:8080";

const commonURI = `${protocol}://${host}`

export default commonURI;
