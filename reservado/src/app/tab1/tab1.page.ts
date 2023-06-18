import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Token } from '@angular/compiler';
import * as jwt from 'jsonwebtoken';

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
  
  mensaje: string='';
  calle:string='';
  comuna:string='';
  id:string='';
  nombre:string='';
  numeracion:string='';
  owned_by:string='';
  list1=[];
  Edificios=[
    this.nombre.split(','),
    this.calle.split(','),
    this.numeracion.split(','),
    this.comuna
  ]
 
//Para hmtl
  // "calle": "Apocalipsis,Clotetzuxal,Lápidas",
  //   "comuna": "21,30,38",
  //   "id": "1,2,3",
  //   "mensaje": "Funcionó",
  //   "nombre": "Babel,Bizantino,Necrópolis",
  //   "numeracion": "661,555,888",
  //   "owned_by": "3,3,3"

 

  constructor(
      
    private router:Router
   ,private api:ApiService
   ,private toastController:ToastController
   ,private loadingCtrl: LoadingController
              
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
    try{
      this.prueba();

    }
    catch(e){

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



prueba(){

this.getComunidad();
this.getEdificio();
}

async getEdificio(){
  const that=this;

  try{
    let respons:any=await that.api.getData()
    if (respons["mensaje"]==="Funcionó"){
   
      console.log('funcionoooooooooooooooooooooooooooooooooooooooooooooooo');
      this.loading_controll();
      this.mensaje=respons["mensaje"];
      this.calle=respons["calle"];
      this.comuna=respons["comuna"];
      this.id=respons["id"];
      this.nombre=respons["nombre"];
      this.numeracion=respons["numeracion"];
      this.owned_by=respons["owned_by"];
      this.Edificios=[
        this.nombre,
        this.calle,
        this.numeracion,
        this.comuna
      ]; 
     console.log('mensaje: '+this.mensaje+"\nCalle: "+this.calle+"\nComuna: "+this.comuna+"\nID: "+this.id+"\nNombre: "+this.nombre+"\nNumeracion: "+this.numeracion+"\nOwned_by: "+this.owned_by);
      
    }else{
      console.log('Error en datos '+respons["mensaje"])
    }

  }catch(error){
    console.log("Error Api: "+error +"c")
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
async getComunidad(){
  const that=this;
  
  try{
    const tokem=that.tok
    const body={
      "Headers" : "Authorization : Bearer "+tokem
    };
    console.log(body)
    const data:any =await that.api.listComunidad(body);
    console.log('Funcooooo'+data)

  }catch(error){
    console.log('Error api:'+error)
  }
}
}
