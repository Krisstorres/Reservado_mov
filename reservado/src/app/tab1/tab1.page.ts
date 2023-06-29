import { Component,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Token } from '@angular/compiler';
import * as jwt from 'jsonwebtoken';
import { ObjectUnsubscribedError, elementAt } from 'rxjs';

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
  owned_by :string='';

  
  
  espaciosComunes:any=[];
  reserva:any=[];
  datos:any=[];
  input_datos:any=[];
  currentFood:any = undefined;
  currentFood2:any = undefined;
  currentFood3:any=undefined;
  correo:string='';
  
  idComunidad:string='';
  idEspacioComun:string='';
  esNull:boolean =false;

  reservaDate:any=[];
  reservaHora:string='';
  reservaFecha:string='';
  reservaTimeZone:string='';

  
  dateTime:string='';
  hora:string='';
  empty:boolean=false;
  esVacio:boolean=false;
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
  const fecha=this.dateTime.split('T')[0].replace('-','/').replace('-','/')
  const anno=fecha.split('/')[0];
  const mes=fecha.split('/')[1];
  const dia=fecha.split('/')[2];
  const hora=this.dateTime.split('T')[1]
  this.hora=hora;
  this.dateTime=''.concat(dia).concat('/'+mes).concat('/'+anno);
  console.log('Fecha: '+this.dateTime+"\nHora: "+this.hora);
  const dateString = "";
  const dateObj = new Date(dateString);
  console.log(dateObj);
  this.mostrar_datos();
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
    this.input_datos=this.currentFood2;
    this.idEspacioComun=this.currentFood2["id"];
    console.log('Input dataa '+this.currentFood2);
  };
  //Funcion Obtencion de datos de html Options


  //Funcion Obtencion de datos de html dateTime
  compareWith3(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  handleChange3(ev:any) {
    this.currentFood3 = ev.target.value;
    this.dateTime=this.currentFood3;
    this.dateTime=this.dateTime; 
    
 
    
    console.log('Input dataa '+this.dateTime.replace('T',' '))
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
  if(this.idEspacioComun !=''){
    this.presentToast('Seleccionaste el espacio común ='+this.currentFood2["descripcion"]);
    this.esNull=true;

  }
  else{
    this.presentToast('Debes seleccionar un espacio comun para continuar ');

  }

}
//Funcion de validacion de ingreso de datos, corrector de flujo de informacion 

//Validador de tiempo 
async TimeValidator(){
  console.log('Date&TimeSelector html = '+this.dateTime)
  const date = new Date(this.dateTime);
  const timezone = date;
  const sysdate = this.formatDate(new Date(this.dateTime));
  console.log('Fecha formateadaa '+sysdate);


  const that=this;
  try{
    const response :any=await that.api.getReservas();
    const largos=Object.keys(response).length;
    
    if(largos != 0){
      that.reserva=response;
      console.log('Reserva = {')
      console.log('ID     :    '+that.reserva[0].id)
      console.log('Espacio:   '+that.reserva[0].espacio)
      console.log('Usuario:   '+that.reserva[0].usuario)
      console.log('Inicio :    '+that.reserva[0].inicio)
      console.log('Fecha  : '+that.reserva[0].inicio.toString().split('T')[0])
      console.log('Hora   : '+that.reserva[0].inicio.toString().split('T')[1].split('.')[0])
      console.log('Time_Zone   : '+that.reserva[0].inicio.toString().split('T')[1].split('.')[1])
      console.log('Duracion:    '+that.reserva[0].duracion)
      console.log('Invitados:   '+that.reserva[0].invitados)
      console.log('Sysdate value = {'+sysdate.toString().split('T')[1].split('.')[0]+'}')
      
      console.log('Formato de fecha entregado a variables de suma: '+sysdate.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',','))
      console.log('} ')
      for(let i = 0 ; i<largos;i++){
        var idReserva=that.reserva[i].id;
        var horaReservas=that.reserva[i].inicio.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',',').split('-')[0].split('-')[0]      ;
        var duracionReserva=that.reserva[i].duracion.toString().replace(':',',').replace(':',',');
        var horaUsuario=sysdate.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',',') ;
        var horaTotal=that.sumarHoras(horaReservas,duracionReserva);
      //    console.log("Inicio de reserva :"+that.reserva[i].inicio)
        if(that.reserva[0].inicio.toString().split('T')[0] == sysdate.toString().split('T')[0]){
          console.log('Dia con reservas, realizando validación de hora ');
          if(  horaUsuario >= horaReservas && horaUsuario <= horaTotal ){
            console.log('ID: '+idReserva)
            console.log('Hora reservas :'+horaReservas);
            console.log('Duracion de reserva: '+duracionReserva);
            console.log('Hora usuario: '+horaUsuario);
            console.log('Hora total: '+horaTotal);
            console.log('Periodo ocupado !!!!!!');
            
            
          }

        }
        else{

        console.log('hora y fecha disponible ')
        }
      }

      
    }else{
    console.log('Error, no se obtuvieron datos ')    
    };

    }
  catch(error){
    console.log('Api error : '+error+' Retry pls ;)')
  };

};

formatDate(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60)).toString().padStart(2, '0');
  const offsetMinutes = (Math.abs(timezoneOffset) % 60).toString().padStart(2, '0');
  const offsetSign = timezoneOffset < 0 ? '+' : '-';

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
  return formattedDate;
  
}
sumarHoras(hora1:any,hora2:any){
  const var1=new Date();
  const var2=new Date();
  
  var horaa1=parseInt(hora1.split(',')[0]) 
  var minutos1=parseInt(hora1.split(',')[1]) 
  var segundos1=parseInt(hora1.split(',')[2]) 
  var horaa2=parseInt(hora2.split(',')[0]) 
  var minutos2=parseInt(hora2.split(',')[1]) 
  var segundos2=parseInt(hora2.split(',')[2]) 
  if(horaa1 <=0 ){
    var1.setHours(parseInt('00'),minutos1,segundos1);
    var2.setHours(horaa2,minutos2,segundos2);
    
    const sumaHora=var1.getHours()+var2.getHours();
    const sumaMinutos= var1.getMinutes()+var2.getMinutes();
    const sumaSegundos=var1.getSeconds()+var2.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);

    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;


  }if(horaa2 <=0){
    var1.setHours(  horaa1  ,minutos1,segundos1);
    var2.setHours(  parseInt('00')  ,minutos2,segundos2);
    
    const sumaHora=var1.getHours()+var2.getHours();
    const sumaMinutos= var1.getMinutes()+var2.getMinutes();
    const sumaSegundos=var1.getSeconds()+var2.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);

    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;


  };

  if(horaa1 == horaa2){
      horaa1=parseInt('00');
      var1.setHours(horaa1,minutos1,segundos1);
      var2.setHours(horaa2,minutos2,segundos2);
      
      const sumaHora=var1.getHours()+var2.getHours();
      const sumaMinutos= var1.getMinutes()+var2.getMinutes();
      const sumaSegundos=var1.getSeconds()+var2.getSeconds();
      
      const sumaCompleta=new Date();
      sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);
    
      const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      return fechaFormateada;
    
  };
  var1.setHours(horaa1,minutos1,segundos1);
  var2.setHours(horaa2,minutos2,segundos2);
  
  const sumaHora=var1.getHours()+var2.getHours();
  const sumaMinutos= var1.getMinutes()+var2.getMinutes();
  const sumaSegundos=var1.getSeconds()+var2.getSeconds();
  
  const sumaCompleta=new Date();
  sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);

  const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  return fechaFormateada;

}

//Logica Pagina Tab1
  }

