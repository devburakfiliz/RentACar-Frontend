import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{
  payAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService){}
  
    ngOnInit(): void {
      this.createPayAddForm();
    }

    createPayAddForm(){
      this.payAddForm=this.formBuilder.group({
        fullName:["",Validators.required],
        cardNumber:["",Validators.required],
        cvv:["",Validators.required],
        mount:["",Validators.required],
        year:["",Validators.required],
      })
    }
    add(){
      if (this.payAddForm.valid) {
        let pay:Payment = Object.assign({},this.payAddForm.value);
          this.paymentService.add(pay).subscribe(response=>{
            this.toastrService.success(response.message,"Başarılı!")
          },responseError=>{
            console.log(responseError)
            if(responseError.error.message){
           
              this.toastrService.error(responseError.error.message
                ,"Doğrulama hatası")
                
          } 
          })
      }else {
        this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!")
      }
    }

   
}
