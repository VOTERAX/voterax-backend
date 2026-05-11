import { prisma } from "../../../prisma";
import { generateAdminToken, } from "../../../shared/constant/userToken";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../shared/services/email/nodeMiler";
import EncryptionRepo from "../../../shared/services/encryption";
import { IAdminLogin, IAdminRegistration, IAdminReSendEmail, IAdminReSetPassword, IAdminVerifyEmail } from "../../../shared/types/admin/adminAuth.interface";
import ErrorInterface from "../../../shared/types/general/error.interface";

const encryption = new EncryptionRepo()

class AdminAuthService {

    private _encryption = encryption

    constructor() {
        // this._encryption = EncryptionRepo
    }

    public register = async (data: IAdminRegistration ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email } = data
        const checkEmail = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (checkEmail) return { errors: [{message: "Email already exist"}] };

        const hashPassword = this._encryption.encryptPassword(data.password)

        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const emailVerificationCodeExpires = new Date()
            emailVerificationCodeExpires.setMinutes(
            emailVerificationCodeExpires.getMinutes() + 15,
        )

        const { password, ...saveUser} = await prisma.admin.create({
            data: {
                email,
                password: hashPassword,
                emailVerificationCode: otp,
                emailVerificationCodeExpires: emailVerificationCodeExpires
            }
        })

        sendVerificationEmail(email, otp)
   
        return { user: saveUser };
    }

    public resendEmail = async (data: IAdminReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email} = data

        const checkEmail = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

           
        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const emailVerificationCodeExpires = new Date()
            emailVerificationCodeExpires.setMinutes(
            emailVerificationCodeExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.admin.update({
            where: {id: checkEmail.id},
            data: {
                emailVerificationCode: otp,
                emailVerificationCodeExpires
            }
        })

        sendVerificationEmail(email, otp)
   
        return { user: updateUser };
    }

    public verifyEmail = async (data: IAdminVerifyEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email, otp} = data

        const checkEmail = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

        if (new Date() > checkEmail.emailVerificationCodeExpires!) return { errors: [{message: "Verification code has expired"}] };

        const emailVerificationCode = checkEmail.emailVerificationCode
        if (!emailVerificationCode)  return { errors: [{message: "Email verification code is undefined"}] };
        
        if (emailVerificationCode != otp) return { errors: [{message: "Invalid otp"}] };

        const { password, ...updateUser} = await prisma.admin.update({
            where: {id: checkEmail.id},
            data: {
                isEmailVerified: true
            }
        })
   
        return { user: updateUser };
    }

    public login = async (data: IAdminLogin) : Promise<{ errors?: ErrorInterface[]; user?: any}> => {
        const {email, password } = data

        const admin = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (!admin) return { errors: [{message:  "Invalid email or password"}] };
        
        if (!admin.isEmailVerified) return { errors: [{message:  "Email not verified."}] };

        const isPasswordValid =  this._encryption.comparePassword(password, admin.password)
        if (!isPasswordValid) return { errors: [{message:  "Invalid email or password."}] };

        const token = generateAdminToken({
            id: admin.id,
            email: admin.email,
        })

        const {password: hashpassword, ...secureUser} = admin
   
        return { user: { token, user: secureUser} };
    }

    public forgotPassword = async (data: IAdminReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email} = data

        const checkEmail = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const resetPasswordExpires = new Date()
            resetPasswordExpires.setMinutes(
            resetPasswordExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.admin.update({
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

    public resetPassword = async (data: IAdminReSetPassword ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {email, otp, password: newPassword} = data

        const admin = await prisma.admin.findFirst({
            where: { email }, // search by unique email
        });

        if (!admin) return { errors: [{message: "Email do not exist"}] };

        if (admin.resetPasswordOtp !== otp) return { errors: [{message: "Invalid or expired OTP"}] };
      
        if (!admin.resetPasswordRequest) return { errors: [{message: "Please request for password change"}] };

        const hashPassword = this._encryption.encryptPassword(newPassword)

        const { password, emailVerificationCode, resetPasswordOtp, ...updateUser} = await prisma.admin.update({
            where: {id: admin.id},
            data: {
                resetPasswordRequest: false,
                password: hashPassword
            }
        })
   
        return { user: updateUser };
    }

}

  export default AdminAuthService;