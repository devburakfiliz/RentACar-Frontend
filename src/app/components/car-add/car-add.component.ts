import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      description:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelName:["",Validators.required],
      modelYear:["",Validators.required],
    })
  }
  add(){
    if (this.carAddForm.valid) {
      let car:Car = Object.assign({}, this.carAddForm.value);
      
        this.carService.add(car).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı!");
        // if (response.success==true) {
        //   this.toastrService.success("Sepete eklendi")
        //   this.rentalService.add(rental);

        // }
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
