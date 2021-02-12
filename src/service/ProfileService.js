import ApiHelper from "./ApiHelper";

class ProfileService {
  
  static async UpdateProfile(body) {
    return ApiHelper.putAuthenticated("updateUser", body);
  }
 
  static async GetUserByID(id, body) {
    return ApiHelper.getAuthenticated(`user/${id}`, body)
  }
  
}
export default ProfileService;
