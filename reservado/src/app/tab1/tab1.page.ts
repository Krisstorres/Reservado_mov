import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
  export class Tab1Page implements OnInit {
    
  corre:any;
  contra:any;
  tokken:any;
  co:string='';
  con:string='';
  tok:string='';


  constructor(
      
    private router:Router
   ,private api:ApiService
   ,private toastController:ToastController
              
              ) {}

  ngOnInit() {
    try{
      this.corre= this.router.getCurrentNavigation();
      this.co= this.corre.extras.state.correo.toString();
      this.contra= this.router.getCurrentNavigation();
      this.con= this.contra.extras.state.contrasena.toString();
      this.tokken= this.router.getCurrentNavigation();
      this.tok= this.tokken.extras.state.token_a.toString();
      console.log('Usuario :'+this.co+"\nContraseña: "+this.con+"\nToken: "+this.tok);
      // token:string='';
    }
    catch(error){
    console.log('Error de navigations extras '+error)      
    };
};
async presentToast(mensaje:string) {
  const toast = await this.toastController.create({
  message: mensaje,
  duration: 1500,
  position: 'bottom'
  });
  
  await toast.present();
  }




  
async getEdificio(id:string,grupos:any){
  const that=this;

  try{
    let respons:any=await that.api.getInfo(id,grupos)

  }catch(error){
    console.log("Error Api: "+error)
  }
}
  

}
