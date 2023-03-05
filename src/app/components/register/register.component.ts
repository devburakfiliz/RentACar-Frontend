import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/register';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private registerService:RegisterService,
    private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if (this.registerForm.valid) {
      let register:Register=Object.assign({},this.registerForm.value);
      this.registerService.register(register).subscribe(response=>{
          this.toastrService.success(response.message,"Kayıt Başarılı")
      },responseError=>{
        console.log(responseError.error.message)
        
        if (responseError) {
          this.toastrService.error(responseError.error.message
            ,"Doğrulama hatası")
        }
      })

    }else {
      this.toastrService.error("Lütfen tüm alanları doldurunuz.", "Hata!")
    }
  }

}
