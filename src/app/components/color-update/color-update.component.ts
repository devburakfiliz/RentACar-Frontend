import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorName:["",Validators.required],
      id:["",Validators.required]
    })
  }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorUpdate:Color = Object.assign({}, this.colorUpdateForm.value);
      
        this.colorService.update(colorUpdate).subscribe(response=>{
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
