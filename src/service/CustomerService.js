import ApiHelper from "./ApiHelper";

class CustomerService {

    static async AddCustomer(body) {
        return ApiHelper.postAuthenticated("addCustomer", body);
    }

    static async UpdateCustomer(body) {
        return ApiHelper.putAuthenticated(`updateCustomer`, body);
    }

    static async GetCustomers(body) {
        return ApiHelper.getAuthenticated("customers", body);
    }

    static async GetCustomerByID(id, body) {
        return ApiHelper.getAuthenticated(`getCustomer/${id}`, body)
    }


    static async DeleteCustomer(body) {
        return ApiHelper.deleteAuthenticated("deleteCustomer", body);
    }

}
export default CustomerService;
