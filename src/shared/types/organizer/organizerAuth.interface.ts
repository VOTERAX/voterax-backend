export interface IOrganizerRegistration {
    firstName: string;   
    lastName: string;      
    userName: string;            
    // picture: string;        
    telegram: string;       
    companyName: string;   
    companyEmail: string;  
    url: string;            
    companyX: string;       
    entityName: string;                 
    industry: string;       
    bio: string;            
    souceOFfund: string;    
    // logo: string;           
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