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
//Logica Pagina Tab1
  export class Tab1Page implements OnInit {
//Variables 
  mensaje:string='';
  corre:any;
  contra:any;
  tokken:any;
  co:string='';
  con:string='';
  tok:string='';

  id:string='';
  nombre:string='';
  calle:string='';
  numeracion:string='';
  comuna:string='';
  owned_by:string='';
  
  direccion_completa:string='';
  nombre_comunidad:string='';
  comuna_comunidad :string='';
  datos:any=[];
  input_datos:any=[];
  currentFood:any = undefined;
  currentFood2:any = undefined;
  currentFood3:any=undefined;
  espaciosComunes:any=[];
  esVacio:boolean=false;
  idComunidad:string='';
  idEspacioComun:string='';
  periodos:any=[

  ];
  perdiodos_duro=['09:00-09:30','10:00-10:30','11:00-11:30','12:00-12:30','13:00-13:30','14:00-14:30','15:00-15:30'];
  esNull:boolean =false;
  dateTime:string='';
  test_print:string='';
  hora:string='';
//Variables 

  //Inyeccion de componentes  y servicios 
  constructor(
      
    private router:Router
   ,private api:ApiService
   ,private toastController:ToastController
   ,private loadingCtrl: LoadingController
              
              ) {};
//Inyeccion de componentes  y servicios               

  
//Funciones y variables de arranque 
ngOnInit() {
    try{
      //Sacando informacion del Navigation Extras 
      this.corre= this.router.getCurrentNavigation();
      this.co= this.corre.extras.state.correo.toString();
      this.contra= this.router.getCurrentNavigation();
      this.con= this.contra.extras.state.contrasena.toString();
      this.tokken= this.router.getCurrentNavigation();
      this.tok= this.tokken.extras.state.token_a.toString();
      console.log('Usuario :'+this.co+"\nContraseña: "+this.con+"\nToken: "+this.tok);
      //Sacando informacion del Navigation Extras 
      
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
//Funciones y variables de arranque 

//Cargando Toast controller
async presentToast(mensaje:string) {
  const toast = await this.toastController.create({
  message: mensaje,
  duration: 1500,
  position: 'bottom'
  });
  
  await toast.present();
  }
//Cargando Toast controller

//Funcion de carga de arranque para extraccion de datos 
prueba(){
this.getComunidad();
this.getEspacios();
}
//Funcion de carga de arranque para extraccion de datos 

//Funcion de Testeo TEMPORAL 
test(){
  const fecha=this.test_print.split('T')[0].replace('-','/').replace('-','/')
  const anno=fecha.split('/')[0];
  const mes=fecha.split('/')[1];
  const dia=fecha.split('/')[2];
  const hora=this.test_print.split('T')[1]
  this.hora=hora;
  this.test_print=''.concat(dia).concat('/'+mes).concat('/'+anno);
  console.log('Fecha: '+this.test_print+"\nHora: "+this.hora);
  const dateString = "2023-06-24T18:00:00.744000-04:00";
const dateObj = new Date(dateString);

console.log(dateObj);
}
//Funcion de Testeo TEMPORAL 

//Preseteo de mensajes de Loading controller 
async loading_controll() {
  console.log('Loading controller')
  const loading = await this.loadingCtrl.create({
  message: 'Enviando Informacion !',
  duration: 3000,
  });
  
  loading.present();
  }
  async loading_controlle() {
    console.log('Loading controller')
    const loading = await this.loadingCtrl.create({
    message: 'No pudimos procesar la información :C',
    duration: 3000,
    });
    
    loading.present();
    }
//Preseteo de mensajes de Loading controller 

//Funcion Listar Comunidades (APISERVICE)
async getComunidad(){
  const that=this;
  
  try{
    const tokem=that.tok
    
    
    const data:any =await that.api.listComunidad();

    this.datos=data;
    this.id=this.datos.id;



  }catch(error){
    console.log('Error api:'+error)
  }
}
//Funcion Listar Comunidades (APISERVICE)

//Funcion Listar Espacios Comunes (APISERVICE)
get_espacio(){
  
  console.log("Select-options: "+this.input_datos);
};
//Funcion Listar Espacios Comunes (APISERVICE)

//Funcion Obtencion de datos de html Options
compareWith(o1:any, o2:any) {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

handleChange(ev:any) {
  this.currentFood = ev.target.value;
  this.input_datos=this.currentFood
  console.log('Input dataa '+this.input_datos["id"]);
  this.idComunidad=this.input_datos["id"];
};
  compareWith2(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  handleChange2(ev:any) {
    this.currentFood2 = ev.target.value;
    this.input_datos=this.currentFood3
    
    console.log('Input dataa '+this.currentFood2)
  };
  //Funcion Obtencion de datos de html Options


  //Funcion Obtencion de datos de html dateTime
  compareWith3(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  handleChange3(ev:any) {
    this.currentFood3 = ev.target.value;
    this.test_print=this.currentFood3;
    this.test_print=this.test_print; 
    
 
    
    console.log('Input dataa '+this.test_print.replace('T',' '))
  };
//Funcion Obtencion de datos de html dateTime



//Funcion Listar Espacios Comunes (APISERVICE)
async getEspacios(){
  let that= this;
  try{
    const response_espacio: any = await that.api.listEspacios();
    if (response_espacio.lenght != 0){
      console.log('Funcionó :'+response_espacio)
      this.espaciosComunes=response_espacio;
    }

  }catch(error){
    console.log('Error Api !, ='+error)
  }
}
//Funcion Listar Espacios Comunes (APISERVICE)


//Funcion de validacion de ingreso de datos, corrector de flujo de informacion 
mostrar_datos(){
  if(this.idComunidad != ''){
    this.presentToast('Seleccionaste una comunidad '+this.currentFood.nombre)
  
    
    this.esVacio=true;
  }else{
    this.presentToast('Debes seleccionar una comunidad para continuar ')
  }
}
//Funcion de validacion de ingreso de datos, corrector de flujo de informacion 




}

//Logica Pagina Tab1