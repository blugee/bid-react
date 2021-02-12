import ApiHelper from "./ApiHelper";

class LineItemService {

    static async AddLineItem(body) {
        return ApiHelper.postAuthenticated("addLine_item", body);
    }

    static async UpdateLineItem(body) {
        return ApiHelper.putAuthenticated(`updateLine_item`, body);
    }

    static async GetLineItems(body) {
        return ApiHelper.getAuthenticated("getLine_itemList", body);
    }

    static async GetLineItemsByItemID(id, body) {
        return ApiHelper.getAuthenticated(`getLine_itemByItemId/item_id/${id}`, body)
    }

    static async GetLineItemsByBidID(id, body) {
        return ApiHelper.getAuthenticated(`Line_itemByBidId/${id}`, body)
    }


    static async DeleteLineItem(body) {
        return ApiHelper.deleteAuthenticated("deleteLine_item", body);
    }

}
export default LineItemService;
