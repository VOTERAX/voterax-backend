import { OrganizerAccountStatus } from "@prisma/client";
import { prisma } from "../../../prisma";
import { generateOTP } from "../../../shared/constant/otp";
import { generateOrgnizerToken, generateToken } from "../../../shared/constant/userToken";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../shared/services/email/nodeMiler";
import EncryptionRepo from "../../../shared/services/encryption";
import ErrorInterface from "../../../shared/types/general/error.interface";
import { IOrganizerLogin, IOrganizerRegistration, IOrganizerReSendEmail, IOrganizerReSetPassword, IOrganizerUpdateProfile, IOrganizerVerifyEmail } from "../../../shared/types/organizer/organizerAuth.interface";

const encryption = new EncryptionRepo()

class OrganzationAuthService {

    private _encryption = encryption

    constructor() {
        // this._encryption = EncryptionRepo
        
    }

    public register = async (data: IOrganizerRegistration ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {companyEmail } = data
        const checkEmail = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (checkEmail) return { errors: [{message: "Email already exist"}] };

        const hashPassword = this._encryption.encryptPassword(data.password)

        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const emailVerificationCodeExpires = new Date()
            emailVerificationCodeExpires.setMinutes(
            emailVerificationCodeExpires.getMinutes() + 15,
        )

        const { password, ...saveUser} = await prisma.organizer.create({
            data: {
                companyEmail,
                password: hashPassword,
                emailVerificationCode: otp,
                emailVerificationCodeExpires: emailVerificationCodeExpires
            }
        })

        sendVerificationEmail(companyEmail, otp)
   
        return { user: saveUser };
    }

    public resendEmail = async (data: IOrganizerReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {companyEmail} = data

        const checkEmail = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

           
        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const emailVerificationCodeExpires = new Date()
            emailVerificationCodeExpires.setMinutes(
            emailVerificationCodeExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.organizer.update({
            where: {id: checkEmail.id},
            data: {
                emailVerificationCode: otp,
                emailVerificationCodeExpires
            }
        })

        sendVerificationEmail(companyEmail, otp)
   
        return { user: updateUser };
    }

    public verifyEmail = async (data: IOrganizerVerifyEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {companyEmail, otp} = data

        const checkEmail = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        if (checkEmail.isEmailVerified) return { errors: [{message: "Email already verified"}] };

        if (new Date() > checkEmail.emailVerificationCodeExpires!) return { errors: [{message: "Verification code has expired"}] };

        const emailVerificationCode = checkEmail.emailVerificationCode
        if (!emailVerificationCode)  return { errors: [{message: "Email verification code is undefined"}] };
        
        if (emailVerificationCode != otp) return { errors: [{message: "Invalid otp"}] };

        const { password, ...updateUser} = await prisma.organizer.update({
            where: {id: checkEmail.id},
            data: {
                isEmailVerified: true
            }
        })
   
        return { user: updateUser };
    }

    public login = async (data: IOrganizerLogin) : Promise<{ errors?: ErrorInterface[]; user?: any}> => {
        const {companyEmail, password } = data

        const organizer = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (!organizer) return { errors: [{message:  "Invalid email or password"}] };
        
        if (!organizer.isEmailVerified) return { errors: [{message:  "Email not verified."}] };

        if (organizer.status !== OrganizerAccountStatus.APPROVED) return { errors: [{message:  "Account not yet approved."}] };

        const isPasswordValid =  this._encryption.comparePassword(password, organizer.password)
        if (!isPasswordValid) return { errors: [{message:  "Invalid email or password."}] };

        const token = generateOrgnizerToken({
            id: organizer.id,
            email: organizer.companyEmail,
        })

        const {password: hashpassword, ...secureUser} = organizer
   
        return { user: { token, user: secureUser} };
    }

    public forgotPassword = async (data: IOrganizerReSendEmail ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {companyEmail} = data

        const checkEmail = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (!checkEmail) return { errors: [{message: "Email do not exist"}] };

        const otp = parseInt(Math.floor(1000 + Math.random() * 9000).toString(),10,)

        const resetPasswordExpires = new Date()
            resetPasswordExpires.setMinutes(
            resetPasswordExpires.getMinutes() + 15,
        )

        const { password, emailVerificationCode, ...updateUser} = await prisma.organizer.update({
            where: {id: checkEmail.id},
            data: {
                resetPasswordOtp: otp,
                resetPasswordRequest: true,
                resetPasswordExpires
            }
        })

        sendForgotPasswordEmail(companyEmail, otp)
   
        return { user: updateUser };
    }

    public resetPassword = async (data: IOrganizerReSetPassword ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const {companyEmail, otp, password: newPassword} = data

        const orgnaizer = await prisma.organizer.findFirst({
            where: { companyEmail }, // search by unique email
        });

        if (!orgnaizer) return { errors: [{message: "Email do not exist"}] };

        if (orgnaizer.resetPasswordOtp !== otp) return { errors: [{message: "Invalid or expired OTP"}] };
      
        if (!orgnaizer.resetPasswordRequest) return { errors: [{message: "Please request for password change"}] };

        const hashPassword = this._encryption.encryptPassword(newPassword)

        const { password, emailVerificationCode, resetPasswordOtp, ...updateUser} = await prisma.organizer.update({
            where: {id: orgnaizer.id},
            data: {
                resetPasswordRequest: false,
                password: hashPassword
            }
        })
   
        return { user: updateUser };
    }


    public profile = async (data: IOrganizerUpdateProfile, file: {picture: string, logo: string}, organizerId: string  ) : Promise<{ errors?: ErrorInterface[]; user?:  any }> => {
        const { firstName, lastName, userName, telegram, companyName, url, companyX, entityName, industry, bio, souceOFfund } = data
        const {picture, logo} = file

        const checkUserName = await prisma.organizer.findFirst({
            where: { userName }, // search by unique email
        });

        if (checkUserName) return { errors: [{message: "User name already taken"}] };

        const { password, emailVerificationCode, resetPasswordOtp, ...updateUser} = await prisma.organizer.update({
            where: {id: organizerId},
            data: {
                firstName,
                lastName,
                userName,
                picture,
                telegram,
                companyName,
                url,
                companyX,
                entityName,
                industry,
                bio,
                souceOFfund,
                logo,
            }
        })

       
        return { user: updateUser };
    }

}

  export default OrganzationAuthService;