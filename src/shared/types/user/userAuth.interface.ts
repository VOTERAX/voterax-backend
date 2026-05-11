
export interface IUserRegistration {
    email: string;
    password: string;
}

export interface IUserReSendEmail {   
    email: string;    
}

export interface IUserVerifyEmail {   
    email: string;  
    otp: number  
}

export interface IUserLogin {   
    email: string;  
    password: string  
}

export interface IUserReSetPassword {   
    email: string; 
    otp: number 
    password: string 
}