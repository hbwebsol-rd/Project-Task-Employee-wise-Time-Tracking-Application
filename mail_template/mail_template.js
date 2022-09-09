module.exports.forgotPassword=function(email) {
    return `<body style="background-color: #592A7B; position: relative; padding: 40px 0; font-family: Arial, sans-serif;">
                <table cellpadding="0" cellspacing="0" border="0" style=" margin-left: auto; margin-right: auto; width: 560px; height: auto; background-color: #fff; border-radius: 6px; padding: 40px 50px;">
                    <tr>
                    <td style="width: 120px; height: 120px; background-color: #592A7B; border-radius: 50%; position: absolute; top: 12px; left: 50%; transform: translateX(-50%);"><img style="width: 60px; padding-left: 30px; padding-top: 32px; height:60px;" src="/img/logo.png"></td>

                        <td  style="position: absolute; top: 130px; left: 50%; transform: translateX(-50%);"><img src="/img/password.png" style="width: 200px;"></td>            
                    </tr>
                    <tr>
                        <td style="width: 460px; padding-bottom: 30px;  padding-top: 240px; height: 290px; background-color: #F6E9FF; border-radius: 6px; text-align: center; box-shadow: 0px 4px 12px rgba(0,0,0,0.09);">
                            <h2 style="font-size: 20px; max-width: 300px; margin: 0 auto; text-align: center; color: #FF951A;">Have you forgotten your old password?</h2>
                            <p style="font-size: 15px; max-width: 300px; margin: 0 auto; padding-top: 24px; text-align: center; color: #592A7B;">We have received a request to set a new password for your account :
                                <a href="#" style="display: block; line-height: 32px; color: #592A7B;">${email}</a>
                            </p>
                            <p style="font-size: 15px; max-width: 300px; margin: 0 auto; padding-top: 10px; padding-bottom: 40px; text-align: center; color: #592A7B;">For updating your password, go to below url with token</p>
                            <a href="#" style="padding: 10px 20px; color: #FF951A; text-decoration: none; border-radius: 20px; font-size: 12px; font-weight: 600; border: 2px solid #FF951A; ">Reset Password</a>
                        </td>
                    </tr>
                </table>
            </body>`
}