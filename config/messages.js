module.exports = {
    // token messages
    TokenNotFound: "No Token, Authorization Denied" ,
    WrongToken: "Authorization Denied", 
    InvalidToken: "Invalid Token String",
    // server messages
    ServerError: "Server Error",
    // field messages
    FieldReq: ":field is Required",
    FieldInvalid: "Invalid :field",
    IDInvalid: "Invalid ID",
    // data messages
    DataNotFound: ":data Not Found",
    DataIDNotFound: "No :data found with that respective ID",
    DataExists: ":data Already Exists",
    PreExistData: ":data with same :field Exists",
    FieldNotFoundInData: ":field not found with that respective :data",
    // password messages
    OldNewPasswordMatch: "New password cannot be same as old password",
    ConfirmPasswordNotMatch: "Password does not match",
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