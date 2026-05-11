import { prisma } from "../../../prisma";
import { generateOTP } from "../../../shared/constant/otp";
import { generateToken } from "../../../shared/constant/userToken";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../shared/services/email/nodeMiler";
import EncryptionRepo from "../../../shared/services/encryption";
import ErrorInterface from "../../../shared/types/general/error.interface";
import { IUserLogin, IUserRegistration, IUserReSendEmail, IUserReSetPassword, IUserVerifyEmail } from "../../../shared/types/user/userAuth.interface";

const encryption = new EncryptionRepo()


class UserAuthService {

    private _encryption = encryption

    constructor() {
        
    }

    public register = async (data: IUserRegistration) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email } = data

        const checkEmail = await prisma.user.findUnique({
            where: { email }, // search by unique email
        });

        if (checkEmail) return { errors: [{message: "Email already exist"}] };

        const hashPassword = this._encryption.encryptPassword(data.password)

        const emailOtp = generateOTP();

        const { password, ...saveUser} = await prisma.user.create({
            data: {
                email,
                password: hashPassword
            }
        })

        sendVerificationEmail(email, parseFloat(emailOtp))
   
        return { user: saveUser };
    }

    public resendEmail = async (data: IUserReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email} = data

        const checkEmail = await prisma.user.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

           
        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const emailVerificationCodeExpires = new Date()
            emailVerificationCodeExpires.setMinutes(
            emailVerificationCodeExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.user.update({
            where: {id: checkEmail.id},
            data: {
                emailVerificationCode: otp,
                emailVerificationCodeExpires
            }
        })

        sendVerificationEmail(email, otp)
   
        return { user: updateUser };
    }

    public verifyEmail = async (data: IUserVerifyEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email, otp} = data

        const checkEmail = await prisma.user.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

        if (new Date() > checkEmail.emailVerificationCodeExpires!) return { errors: [{message: "Verification code has expired"}] };

        const emailVerificationCode = checkEmail.emailVerificationCode
        if (!emailVerificationCode)  return { errors: [{message: "Email verification code is undefined"}] };
        
        if (emailVerificationCode != otp) return { errors: [{message: "Invalid otp"}] };

        const { password, ...updateUser} = await prisma.user.update({
            where: {id: checkEmail.id},
            data: {
                isEmailVerified: true
            }
        })
   
        return { user: updateUser };
    }

    public login = async (data: IUserLogin) : Promise<{ errors?: ErrorInterface[]; user?: any}> => {
        const {email, password } = data

        const checkUser = await prisma.user.findUnique({
            where: { email }, // search by unique email
        });

        if (!checkUser) return { errors: [{message:  "Account not found"}] };
        if (!checkUser.isEmailVerified) return { errors: [{message:  "Email not verified."}] };

        const isPasswordValid =  this._encryption.comparePassword(password, checkUser.password)
        if (!isPasswordValid) return { errors: [{message:  "Invalid email or password."}] };

        const token = generateToken({
            id: checkUser.id,
            email: checkUser.email,
        })

        const {password: hashpassword, ...secureUser} = checkUser
   
        return { user: { token, user: secureUser} };
    }

    public forgotPassword = async (data: IUserReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email} = data

        const checkEmail = await prisma.user.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const resetPasswordExpires = new Date()
            resetPasswordExpires.setMinutes(
            resetPasswordExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.user.update({
            where: {id: checkEmail.id},
            data: {
                resetPasswordOtp: otp,
                resetPasswordRequest: true,
                resetPasswordExpires
            }
        })

        sendForgotPasswordEmail(email, otp)
   
        return { user: updateUser };
    }

    public resetPassword = async (data: IUserReSetPassword ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email, otp, password: newPassword} = data

        const user = await prisma.user.findFirst({
            where: { email }, // search by unique email
        });

        if (!user) return { errors: [{message: "Email do not exist"}] };

        if (user.resetPasswordOtp !== otp) return { errors: [{message: "Invalid or expired OTP"}] };
      
        if (!user.resetPasswordRequest) return { errors: [{message: "Please request for password change"}] };

        const hashPassword = this._encryption.encryptPassword(newPassword)

        const { password, emailVerificationCode, resetPasswordOtp, ...updateUser} = await prisma.user.update({
            where: {id: user.id},
            data: {
                resetPasswordRequest: false,
                password: hashPassword
            }
        })
   
        return { user: updateUser };
    }

}

  export default UserAuthService;