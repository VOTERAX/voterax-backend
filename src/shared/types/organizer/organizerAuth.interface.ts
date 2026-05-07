export interface IOrganizerRegistration {
    companyEmail: string;   
    password: string;      
}

export interface IOrganizerReSendEmail {   
    companyEmail: string;    
}

export interface IOrganizerVerifyEmail {   
    companyEmail: string;  
    otp: number  
}

export interface IOrganizerLogin {   
    companyEmail: string;  
    password: string  
}

export interface IOrganizerReSetPassword {   
    companyEmail: string; 
    otp: number 
    password: string 
}

export interface IOrganizerUpdateProfile {
    firstName: string;   
    lastName: string;      
    userName: string;            
    telegram: string;       
    companyName: string;   
    url: string;            
    companyX: string;       
    entityName: string;                 
    industry: string;       
    bio: string;            
    souceOFfund: string;         
}