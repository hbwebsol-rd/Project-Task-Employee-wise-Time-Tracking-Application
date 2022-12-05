module.exports = {
    // token messages
    TokenNotFound: "No Token, Authorization Denied" ,
    AuthDenied: "Authorization Denied", 
    InvalidToken: "Invalid Token String",
    // id messages
    InvalidID: "Invalid ID",
    // server messages
    ServerError: "Server Error",
    // field messages
    FieldRequired: ":field is Required",
    FieldInvalid: "Invalid :field",
    FieldNotFound: ":field Not Found",
    // data messages
    DataNotFound: ":data Not Found",
    DataNotFoundWithID: "No :data found with that respective ID",
    DataExists: ":data Already Exists",
    DataWithFieldExists: ":data with same :field Exists",
    FieldNotFoundInData: ":field not found with that respective :data",
    // password messages
    OldNewPasswordMatch: "New password cannot be same as old password",
    PasswordNotMatch: "Password does not match",
    // success messages
    UpdateSuccess: ":data Updated Successfully",
    AddSuccess: ":data Added Successfully",
    DeleteSuccess: ":data Data Deleted Successfully",
    // login messages
    LoginNotMatch: "Invalid Credentials",
    // date & time messages
    InvalidDate: "End Date must be greater than Start Date",
    InvalidTime: "End Time must be greater than Start Time",
    TimeCollision: "There already exists a :data within this duration"
}