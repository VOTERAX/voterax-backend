import { prisma } from "../../../prisma";
import { generateOTP } from "../../../shared/constant/otp";
import { generateToken } from "../../../shared/constant/userToken";
import { sendVerificationEmail } from "../../../shared/services/email/nodeMiler";
import EncryptionRepo from "../../../shared/services/encryption";
import ErrorInterface from "../../../shared/types/general/error.interface";
import { IUserRegistration } from "../../../shared/types/user/userAuth.interface";


class UserAuthService {

    private _encryption: any;

    constructor() {
        this._encryption = EncryptionRepo
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

    public login = async (data: IUserRegistration) : Promise<{ errors?: ErrorInterface[]; user?: any}> => {
        const {email } = data

        const checkUser = await prisma.user.findUnique({
            where: { email }, // search by unique email
        });

        if (!checkUser) return { errors: [{message:  "Account not found"}] };

        const token = generateToken({
            id: checkUser.id,
            email: checkUser.email,
        })

        const {password, ...secureUser} = checkUser
   
        return { user: { token, user: secureUser} };
    }

}

  export default UserAuthService;