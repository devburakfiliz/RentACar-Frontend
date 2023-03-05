import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if (this.colorAddForm.valid) {
      let color:Color=Object.assign({},this.colorAddForm.value);

      this.colorService.add(color).subscribe(response=>{
        this.toastrService.success(response.message,"BAŞARILI.")
      },responseError=>{
        if (responseError) {
          this.toastrService.error(responseError.error.message, "Doğrulama hatası")
        }
      })
    }else{
      this.toastrService.error("Lütfen tüm alanları Doldurunuz.","HATA")
    }
  }
}
