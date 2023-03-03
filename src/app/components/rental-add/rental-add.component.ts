import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  constructor(private formBulilder:FormBuilder,
    private rentalService:RentalService,
    private toastrService:ToastrService){}

    ngOnInit(): void {
      this.createRentalAddForm();
    }

    createRentalAddForm(){
      this.rentalAddForm=this.formBulilder.group({
        carId:["",Validators.required],
        rentDate:["",Validators.required],
        customerId:["",Validators.required]
      })
    }
    add(){
      if (this.rentalAddForm.valid) {
        let rental:Rental = Object.assign({}, this.rentalAddForm.value);
        
        this.rentalService.add(rental).subscribe(response=>{
          this.toastrService.success(response.message, "Başarılı!");
        } ,responseError=>{  

          if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage
                ,"Doğrulama hatası")
            }       
          } 
        }
        )
      } else {
        this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!")
      }
    }
    
  
}

