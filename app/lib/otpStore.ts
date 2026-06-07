let store:any = {};

export const setOtp = (email:string, otp:string)=>{
store[email] = {
otp,
expires: Date.now() + 5*60*1000
};
};

export const getOtp = (email:string)=>{
return store[email];
};

export const deleteOtp = (email:string)=>{
delete store[email];
};