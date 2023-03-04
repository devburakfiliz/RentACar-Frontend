import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm:FormGroup

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService){}

    ngOnInit(): void {
      this.createCarUpdateForm();
    }
    createCarUpdateForm(){
      this.carUpdateForm=this.formBuilder.group({
        carId:["",Validators.required],
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        description:["",Validators.required],
        dailyPrice:["",Validators.required],
        modelName:["",Validators.required],
        modelYear:["",Validators.required],
      })
    }
    update(){
      if (this.carUpdateForm.valid) {
        let carUpdate:Car = Object.assign({}, this.carUpdateForm.value);
        
          this.carService.update(carUpdate).subscribe(response=>{
          this.toastrService.success(response.message, "Başarılı!");

        } ,responseError=>{  
          console.log(responseError.error.message)
  
          if(responseError){
           
              this.toastrService.error(responseError.error.message
                ,"Doğrulama hatası")
                
          } 
          
        }
        )
      } else {
        this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!")
      }
    }
}



