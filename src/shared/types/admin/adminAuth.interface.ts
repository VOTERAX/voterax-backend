export interface IAdminRegistration {
    email: string;   
    password: string;      
}

export interface IAdminReSendEmail {   
    email: string;    
}

export interface IAdminVerifyEmail {   
    email: string;  
    otp: number  
}

export interface IAdminLogin {   
    email: string;  
    password: string  
}

export interface IAdminReSetPassword {   
    email: string; 
    otp: number 
    password: string 
}
