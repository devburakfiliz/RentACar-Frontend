export interface Payment{
    id:number;
    customerId:number;
    fullName:string;
    cardNumber:string;
    cvv:string;
    mount:number;
    year:number;
}