import ApiHelper from "./ApiHelper";

class BidService {

    static async AddBid(body) {
        return ApiHelper.postAuthenticated("addBid", body);
    }

    static async UpdateBid(body) {
        return ApiHelper.putAuthenticated(`updateBid`, body);
    }

    static async GetBids(body) {
        return ApiHelper.getAuthenticated("getBidList", body);
    }

    static async GetBidByID(id, body) {
        return ApiHelper.getAuthenticated(`getBid/${id}`, body)
    }


    static async DeleteBid(body) {
        return ApiHelper.deleteAuthenticated("deleteBid", body);
    }

}
export default BidService;
