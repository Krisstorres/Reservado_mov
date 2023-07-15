import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string="";
  pass:string=""; 
  token:string='';
  userData:any=[];
  userID:string='';
  nombre_usuario:string='';
  else_msj:any
  validador:boolean=false;
  esActivo:boolean=false;
  esAdmin:boolean=false;
  esMoroso:boolean=false;
  constructor(private router:Router
    ,private api:ApiService
    ,private toastController:ToastController
    ,private loadingCtrl: LoadingController
    
    ) {
  console.log ('pagina iniciada')
}

ngOnInit() {
}
async loading_controll() {
  console.log('Loading controller')
  const loading = await this.loadingCtrl.create({
  message: 'Validando información',
  duration: 3000,
});

loading.present();
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
  this.presentToast('Porfavor rellenar campos antes continuar ')

}else{
  console.log('datos envados correctamente')
  
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
    that.api.canTrigger();
    console.log(login,'Funncionoooooooo');
    
    //asignado valor a de token  a variable 
    that.token=login['access_token'];
    //asignado valor a de token  a variable 
    //asignando valor de datos a variables 
    console.log("Token :"+that.token) 

    const parametros: NavigationExtras={
      state:{
        correo : email,
        contrasena : pass,
        token_a : that.token,
        nombre :await that.getUserdata(email),
        userID:this.userID,
        userData:this.userData,
        esmoroso:this.esMoroso,
        esAdmin:this.esAdmin,
        esActivo:this.esActivo


      }}
    that.api.getvars(email,pass,this.token,await that.getUserdata(email), this.userID,this.userData)
    that.router.navigate(['Fabs/tab1'],parametros)
  
    
}
  else{that.presentToast('Error de validacion ='+that.else_msj)
    console.log(login,"no se encontro el usuario");
    that.presentToast('Error de auntenticacion favor reintar ')
    }
}catch (error) {
  //TODO INDICAR QUE OCURRIÓ UN ERROR CON LA API
  console.log('error api'+error)
  that.presentToast('Contraseña o Usuario incorrecto')
}

}
async getUserdata(correo:string){
  const that= this;
  try{
    const respuesta:any = await that.api.getUsuario();
    const largo = Object.keys(respuesta).length;
    that.userData=respuesta;
    console.log(' Menssage: Funcionó ! ')

    for(let i = 0 ; i < largo; i++){

      if( that.userData[i].email.toString()  != correo  ){
        console.log('NO SE GUARDÓ!')
      }else{
        that.userID=that.userData[i].id;
        console.log('  ')
        console.log('Se GUARDÓ !')
        console.log('Correo guardado: '+that.userData[i].email+'\nNumero Objeto: '+i+"\nID Usuario: "+that.userID)
        that.nombre_usuario=that.userData[i].first_name+' '+that.userData[i].last_name+'.'
        that.nombre_usuario=that.nombre_usuario
        console.log('Nombre usuario en login : '+that.nombre_usuario);
        console.log(that.userData[i].first_name+' '+that.userData[i].last_name+'.')
        console.log('  ')
        that.api.updateuserData(that.userData[i].is_active,that.userData[i].is_staff,that.userData[i].moroso)
        that.esMoroso=that.userData[i].moroso;
        that.esActivo=that.userData[i].is_active;
        that.esAdmin=that.userData[i].is_staff;
        that.esAdmin=that.esAdmin;
        that.esActivo=that.esActivo;
        that.esMoroso=that.esMoroso;
        
      }
    }
     return that.nombre_usuario
  }catch(e){
    console.log('Error api: '+e )
    return 'Error: '+e
  }
  
}




}