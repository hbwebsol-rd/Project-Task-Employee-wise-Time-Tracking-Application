const Messages = require('./messages')

///////////////////////////////////////  TIMESHEET HELPERS  //////////////////////////////////////////
// extract hours and minites 
const convertTime=(time, date)=>{
    const hours=time.slice(0,2)
    const minutes=time.slice(3,5)
    const timeType=time.slice(6,8).toLowerCase()
    const taskTime=new Date(date)
    taskTime.setHours(hours, minutes)
    // convert 12-hour format to 24-hour format
    if(timeType==="pm"&&parseInt(hours)<12){
        const newHours=parseInt(hours)+12
        taskTime.setHours(newHours, minutes)
    }
    return taskTime
}

const convertDate=(date)=>{
    const day = date.slice(0,2)
    const month = date.slice(3,5)
    const year = date.slice(6,10)
    const newDate=new Date()
    newDate.setDate(day)
    newDate.setMonth(parseInt(month)-1)
    newDate.setFullYear(year)
    newDate.setHours(00, 00, 00, 00)
    return newDate
}

const checkTimeValidity=(startTime, endTime)=>{
    if(startTime.getHours()>=endTime.getHours() && startTime.getMinutes()>=endTime.getMinutes()) return true
    return false
}

const checkDateValidity=(startDate, endDate)=>{
    if(startDate>=endDate) return true
    return false
}

const checkTimeCollision=(currentTime, prevStartTime, prevEndTime)=>{
    // check time collision between hours and minutes
    if((currentTime.getHours()>=prevStartTime.getHours() && currentTime.getHours()<=prevEndTime.getHours()) &&
        (currentTime.getMinutes()>=prevStartTime.getMinutes() && currentTime.getMinutes()<=prevEndTime.getMinutes())){
        return true
    }else{
        return false
    }
}

////////////////////////////////////////  RESPONSES  /////////////////////////////////////////////
const ResponseMsg = (type, field, data, boolean) => {
    if(data!==""){
        if(field!==""){
            let message = Messages[type].replace(":field", field)
            return {
                message: message.replace(":data", data),
                success: boolean,
            };
        }else{
            return {
                message: Messages[type].replace(":data", data),
                success: boolean,
            };
        }
    }else if(field!==""){
        return {
            message: Messages[type].replace(":field", field),
            success: boolean,
        };
    }else{
        return {
            message: Messages[type],
            success: boolean,
        };
    }
};

//////////////////////////////////////////  EXPORTS  /////////////////////////////////////////
module.exports = {
    convertDate: convertDate,
    convertTime: convertTime,
    checkDateValidity: checkDateValidity,
    checkTimeCollision: checkTimeCollision,
    checkTimeValidity: checkTimeValidity,
    ResponseMsg: ResponseMsg
}