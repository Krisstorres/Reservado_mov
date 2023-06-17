import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string="";
  pass:string=""; 
  token:string='';
  storage_email=localStorage.setItem('email','')
  storage_pass=localStorage.setItem('password','')
  storage_token=localStorage.setItem('token','')
  else_msj:any
  constructor(private router:Router
    ,private api:ApiService
    ,private toastController:ToastController
    ,private loadingCtrl: LoadingController
    
    ) {
console.log ('pagina iniciada')
}

ngOnInit() {
}
async presentToast(mensaje:string) {
const toast = await this.toastController.create({
message: mensaje,
duration: 1500,
position: 'bottom'
});

await toast.present();
}
navegar(){
if (this.email =='' || this.pass == ''){
console.log('Porfavor rellenar campos antes de enviar datos ')
this.presentToast('Porfavor rellenar campos antes de enviar datos ')

}else{
console.log('datos envados correctamente')
this.presentToast('datos envados correctamente')
this.loading_controll()
this.passValidator(this.email,this.pass)  
}


}

async passValidator(email:string,pass:string){
const that=this;

try {

let login:any =await  that.api.ValidateApiService(email, pass);
that.else_msj=login
if(login['message'] === 'Authentication successful') {
console.log(login,'Funncionoooooooo');
//asignado valor a de token  a variable 
that.token=login['access_token'];
//asignado valor a de token  a variable 
//asignando valor de datos a variables 
console.log("Token :"+that.token) 
that.storage_email=localStorage.setItem('email',email)
that.storage_pass=localStorage.setItem('password',pass)
that. storage_token=localStorage.setItem('token',that.token)
const parametros: NavigationExtras={
  state:{
    correo:email,
    contrasena:pass,
    token_a:that.token
  }
}
that.router.navigate(['Fabs/tab1'],parametros)//Reemplazar con 'Fabs'

}
else {
this.presentToast('Error de validacion ='+this.else_msj)
console.log(login,"no se encontro el usuario");
}
}catch (error) {
//TODO INDICAR QUE OCURRIÓ UN ERROR CON LA API
console.log('error api'+error)
}

}
async loading_controll() {
console.log('Loading controller')
const loading = await this.loadingCtrl.create({
message: 'Validando información',
duration: 3000,
});

loading.present();
}




}