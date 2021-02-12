import ApiHelper from "./ApiHelper";

class ItemService {

    static async AddItem(body) {
        return ApiHelper.postAuthenticated("addItem", body);
    }

    static async UpdateItem(body) {
        return ApiHelper.putAuthenticated(`updateItem`, body);
    }

    static async GetItems(body) {
        return ApiHelper.getAuthenticated("items", body);
    }

    static async GetItemByID(id, body) {
        return ApiHelper.getAuthenticated(`item/${id}`, body)
    }

    static async GetItemByUserID(id, body) {
        return ApiHelper.getAuthenticated(`getItemsbyUser_id`, body)
    }


    static async DeleteItem(body) {
        return ApiHelper.deleteAuthenticated("deleteItem", body);
    }
}
export default ItemService;
