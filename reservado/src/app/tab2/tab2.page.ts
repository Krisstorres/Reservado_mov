import { ObjectUnsubscribedError, elementAt } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Console } from 'console';
import { Component,  OnInit, ViewChild, ElementRef,Input} from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import {  LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Token } from '@angular/compiler';
import * as jwt from 'jsonwebtoken';
import { AlertController } from '@ionic/angular';
import {Swiper} from 'swiper'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild ('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

//Variables:
menuType: string = 'overlay';
nombre_usuario:string='';
id:string='';
idComunidad:string='';
idEspacioComun:string='';
dateTime:string='';
hora:string='';
time:string='';

comunidadID:string='';
minutos:any='';
mail:string='';
esMoroso:string='';
esAdmin:string='';
esActivo:string='';

// navigatiosExtras
storage_email=localStorage.getItem('email')
mensaje:string='';
corre:any;
contra:any;
tokken:any;
nombr:any;
co:string='';
con:string='';
tok:string='';
userDatta:any=[];

activo:boolean=false;
admin:boolean=false;
moroso:boolean=false;

userDaata:any=[];
userId:string='';




// navigatiosExtras
//almacenamiento de datos de endpoints backend 
espaciosComunes:any=[];
reserva:any=[];
datos:any=[];
input_datos:any=[];
misReservas:any=[]
userData:any=[];
userDataFiltered:any=[];
almacenamiento:any=[];
items :any= []
nombresEspacios:any=[];
filteredEspacio:any=[];
filteredComunidad:any=[];
direccionFiltered:any=[];
  comentarios: any[] = [
    {
      nombre: "Usuario1",
      comentario: "¡Excelente experiencia de reserva! El proceso fue rápido y sencillo. Definitivamente recomendaría reservado.com.",
      recomendar: true
    },
    {
      nombre: "Usuario2",
      comentario: "Increíbles opciones de alojamiento. Quedé muy satisfecho con mi reserva a través de reservado.com. Lo recomiendo totalmente.",
      recomendar: true
    },
    {
      nombre: "Usuario3",
      comentario: "La plataforma de reservado.com me ayudó a encontrar el mejor precio para mi estadía. Definitivamente la recomendaría a otros viajeros.",
      recomendar: true
    },
    {
      nombre: "Usuario4",
      comentario: "Tuve una experiencia maravillosa con reservado.com. El servicio al cliente fue excepcional. Lo recomendaría sin dudarlo.",
      recomendar: true
    },
    {
      nombre: "Usuario5",
      comentario: "No puedo decir lo suficiente sobre reservado.com. Hicieron que todo el proceso de reserva fuera tan fácil y rápido. ¡Muy recomendable!",
      recomendar: true
    }
  ];
idReservaFiltered:any;

//almacenamiento de datos de endpoints backend 
//datos de inputs 
currentFood:any = undefined;
currentFood2:any = undefined;
currentFood3:any=undefined;
currentFood4:any=undefined;
//datos de inputs

//mostrar datos 
esNull:boolean =false;
estaValido:boolean=false;
empty:boolean=false;
esVacio:boolean=false;
estaValidado:boolean=false;
borrar_html:boolean=false;
clickBadge:boolean=false;

//mostra datos   
//Variables 

//Inyeccion de componentes  y servicios 
constructor(
    
  private router:Router
 ,private api:ApiService
 ,private toastController:ToastController
 ,private loadingCtrl: LoadingController
 ,private alert: AlertController
            
            ) {};
//Inyeccion de componentes  y servicios               


//Funciones y variables de arranque 
ngOnInit() {
  try{
  //Extrayendo informacion del Navigation Extras 
    this.corre= this.router.getCurrentNavigation();
    this.co= this.corre.extras.state.correo.toString();
    this.contra= this.router.getCurrentNavigation();
    this.con= this.contra.extras.state.contrasena.toString();
    this.tokken= this.router.getCurrentNavigation();
    this.tok= this.tokken.extras.state.token_a.toString();
    this.nombr=this.router.getCurrentNavigation();
    this.nombre_usuario=this.nombr.extras.state.nombre.toString();
    const act :any=this.router.getCurrentNavigation();
    this.activo=act.extras.state.esActivo;
    const adm:any=this.router.getCurrentNavigation();
    this.admin=adm.extras.state.esAdmin;
    const morr:any=this.router.getCurrentNavigation();
    this.moroso=morr.extras.state.esmoroso;
    const dat: any=this.router.getCurrentNavigation();
    this.userDaata=dat.extras.state.userData;       //rw3r3wr3
    const idd:any=this.router.getCurrentNavigation();
    this.userId=idd.extras.state.userId;          
      //rw3rwr3wr3

    this.api.getvars(this.co,this.con,this.tok,this.nombre_usuario,this.userId,this.userDaata)

    console.log('Nombre usuario : '+this.nombre_usuario)
    console.log('Usuario :'+this.co+"\nContraseña: "+this.con+"\nToken: "+this.tok);
    
    
    
    
    try{
      

    }catch(e){
      console.log('Error en obtencion de nombres por navigatios extras ! ')
    }
    
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
@Input() name?: string;
//Funciones y variables de arranque 
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
  this.misReservaas();
  this.getUserdata();
  
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
  
  const loading = await this.loadingCtrl.create({
  message: 'Enviando Informacion !',
  duration: 3000,
  });
  
  loading.present();
  }
async loading_controlle() {
 
  const loading = await this.loadingCtrl.create({
  message: 'CREANDO RESERVA ..... ',
  duration: 6000,
    });
    
    loading.present();
    }
    async loading_controllee() {
 
      const loading = await this.loadingCtrl.create({
      message: 'CREANDO RESERVA ..... ',
      duration: 6000,
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

    that.datos=data;
    that.id=that.datos.id;
    const largo = Object.keys(data).length;

    for(let i = 0 ; i < largo; i++){
      if(that.userId == that.datos[i].owned_by ){
      let o = 0;
      that.datos[o]=data[i]
      console.log(" SE alamacenaron "+o+" Objetos "+this.datos);
      o=o+1;
      }else{
        that.presentToast('Su usuario no posee cominidades registradas ! ')
      }
      
    };



  }catch(error){
    console.log('Error api:'+error)
  }
}
//Funcion Listar Comunidades (APISERVICE)

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
};
compareWith4(o1:any, o2:any) {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};
handleChange4(ev:any) {
  this.currentFood4 = ev.target.value;
  this.minutos=this.currentFood4;
  this.minutos=this.minutos; 
  console.log('Minutos: '+this.minutos)
};
//Funcion Obtencion de datos de html dateTime


async getEspacios(){
  let that= this;
  try{
    const response_espacio: any = await that.api.listEspacios();
    if (response_espacio.lenght != 0){
      console.log('Funcionó :'+response_espacio)
      that.espaciosComunes=response_espacio; 
      
    }

  }catch(error){
    console.log('Error Api !, ='+error)
  }
}
//Funcion Listar Espacios Comunes (APISERVICE)


//Funcion de validacion de ingreso de datos, corrector de flujo de informacion 
async mostrar_datos(){
  
  if(this.idComunidad != ''){
    this.presentToast('Seleccionaste una comunidad '+this.currentFood.nombre)
  
    
    this.esVacio=true;
  }else{
    this.presentToast('Debes seleccionar una comunidad para continuar !')
  }
  if(this.idEspacioComun !=''){
    this.presentToast('Seleccionaste el espacio común ='+this.currentFood2["descripcion"]);
    this.esNull=true;

  }
  else{
    this.presentToast('Debes seleccionar un espacio comun para continuar !');

  }
  if(this.time == ''){
    this.presentToast('Debes seleccionar una fecha y hora de reserva para continuar ! ')
  }
  
  

}
async moostrar_datos(){
  if(this.esNull){
  if (await this.TimeValidator() == 'Periodo disponible'){
    this.presentToast('Periodo disponible !! ')
    this.empty=true;
  }else if(await this.TimeValidator() == 'Periodo ocupado'){
    this.empty=false;
  }
  if(this.empty == true){
    this.estaValido = true;
  }
}
}
validarMinutos(){

  if(this.minutos != ''){
    this.transformTimeToHours(this.minutos)
    this.minutos=this.transformTimeToHours(this.minutos);
    console.log('Duracion formateada '+this.transformTimeToHours(this.minutos))
    this.estaValidado=true; 
    
    
  }
}
//Funcion de validacion de ingreso de datos, corrector de flujo de informacion 

//Validador de tiempo 
async TimeValidator(){
  // console.log('Date&TimeSelector html = '+this.dateTime)
  const date = new Date(this.dateTime);
  const timezone = date;
  const sysdate = this.formatDate(new Date(this.dateTime));
  
  // console.log('Fecha formateadaa '+sysdate);


  const that=this;
  that.time=sysdate;
  if( sysdate.toString() == '0NaN-NaN-NaNTNaN:NaN:NaN'){
    
  }else{
  that.presentToast('DEBE SELECCIONAR UN PERIDO PARA CONITINUAR ')
}
  try{
    const response :any=await that.api.getReservas();
    const largos=Object.keys(response).length;
    
    if(largos != 0){
      that.reserva=response;
      // console.log('Reserva = {')
      // console.log('ID     :    '+that.reserva[0].id)
      // console.log('Espacio:   '+that.reserva[0].espacio)
      // console.log('Usuario:   '+that.reserva[0].usuario)
      // console.log('Inicio :    '+that.reserva[0].inicio)
      // console.log('Fecha  : '+that.reserva[0].inicio.toString().split('T')[0])
      // console.log('Hora   : '+that.reserva[0].inicio.toString().split('T')[1].split('.')[0])
      // console.log('Time_Zone   : '+that.reserva[0].inicio.toString().split('T')[1].split('.')[1])
      // console.log('Duracion:    '+that.reserva[0].duracion)
      // console.log('Invitados:   '+that.reserva[0].invitados)
      // console.log('Sysdate value = {'+sysdate.toString().split('T')[1].split('.')[0]+'}')
      
      // console.log('Formato de fecha entregado a variables de suma: '+sysdate.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',','))
      // console.log('} ')

      for(let i = 0 ; i<largos;i++){
        var idReserva=that.reserva[i].id;
        var horaReservas=that.reserva[i].inicio.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',',').split('-')[0].split('-')[0]      ;
        var duracionReserva=that.reserva[i].duracion.toString().replace(':',',').replace(':',',');
        var horaUsuario=sysdate.toString().split('T')[1].split('.')[0].replace(':',',').replace(':',',') ;
        var horaTotal=that.sumarHoras(horaReservas,duracionReserva);
        
        
        var horaActual=that.formatDate(new Date())
        // console.log('Fecha actual '+horaActual.toString().split('.')[0])
        // console.log('Fecha seleccionada: '+sysdate.toString().split('.')[0])
      //    console.log("Inicio de reserva :"+that.reserva[i].inicio)
      if(horaActual.toString().split('.')[0] > sysdate.toString().split('.')[0]){
        if(that.reserva[i].inicio.toString().split('T')[0] == sysdate.toString().split('T')[0]){
          // console.log('Dia con reservas, realizando validación de hora ');
          that.presentToast('Dia con reservas, realizando validación de hora ');
          if(  horaUsuario >= horaReservas && horaUsuario <= horaTotal){
            // console.log('ID: '+idReserva)
            // console.log('Hora reservas :'+horaReservas);
            // console.log('Duracion de reserva: '+duracionReserva);
            // console.log('Hora usuario: '+horaUsuario);
            // console.log('Hora total: '+horaTotal);
            // console.log('Periodo ocupado !!!!!!');
            that.presentToast('Periodo seleccionado ocupado ! ')
          this.mensaje='Periodo ocupado';
            return this.mensaje;
            
            
          }else{
            that.dateTime=sysdate;
            that.presentToast('Periodo disponible');
            
          }

        }else{
          this.mensaje='Periodo disponible'
          that.dateTime=sysdate;
          that.presentToast('Periodo disponible !! ')
          return this.mensaje;
        }
      }else{

        // console.log('hora y fecha disponible ')
        this.mensaje='Periodo disponible'
        that.dateTime=sysdate;
        return this.mensaje;
        }
      
      
      }

      

      this.mensaje='Periodo disponible'
      that.dateTime=sysdate;
      
    }else{
    console.log('Error, no se obtuvieron datos ')    
    this.mensaje='Error no se obtuvieron datos ';
    };

    }
  
  catch(error){
    console.log('Api error : '+error+' Retry pls ;)')
    this.mensaje='Error de Api'; 
  };
    

  return this.mensaje;

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
async upLoadReserva(){
const that=this;
try{

}catch(e){
  console.log("Error: "+e)
  that.presentToast('Error de api recargue app PLZ TT_TT '+e)
}
}
async misReservaas(){
const that= this; 
try{

const respuestas: any=await that.api.getReservas();
const largoRespuesta= Object.keys(respuestas).length
if (largoRespuesta >=1){
  that.misReservas=respuestas;
  var num = 0;
  const largo = Object.keys(this.misReservas).length;
  for(let i = 0; i < largo; i++  ){
    
    if(parseInt(that.misReservas[i].usuario) === parseInt(that.userId)){
      that.almacenamiento[num]=that.misReservas[i];
      num=num+1;
      num=num;
      
    }else{
      console.log('usuario no encontrado  ! ')
    }
  }
  console.log('Mensaje : Funcionó');

  for(let i=0; i < largoRespuesta; i++){
 
     if(respuestas[i].usuario == that.userId){
   
      
      
   

      console.log('ESPACIO COMÚN EXTRAIDO CON EXITO ! '+that.misReservas[i])
     }
  }
  
  console.log('Reservas '+that.misReservas)

}else{
  console.log('Error: Extraccion de datos  ')
}
}catch(e){
  console.log('Error api: '+e)
}
}
async getUserdata(){
  const that= this;
  try{
    const respuesta:any = await that.api.getUsuario();
    const largo = Object.keys(respuesta).length;
    that.userData=respuesta;
    console.log(' Menssage: Funcionó ! ')

    for(let i = 0 ; i < largo; i++){

      if( that.userData[i].email.toString()  != that.co  || that.userData[i] !=that.co ){
        console.log('no se guarda')
      }else{
     
        if (this.userData.lenght != 0 )
        { 
          // if(that.userId == ''|| that.userId == 'udefined'){
          //   that.userId=that.userDaata.id;
  
          // }
        console.log('OBjetos user datas ')
        that.userId=that.userData[i].id;
        that.userDataFiltered[0]=that.userData[i];
        console.log('  ')
        console.log('Se GUARDÓ')
        console.log('Correo guardado: '+that.userDaata[i].email+'\nNumero Objeto: '+i+"\nID Usuario: "+that.userId)
        if( !that.userDataFiltered.moroso){
          that.esMoroso ='Moroso';
        }else{
          that.esMoroso='Sin deuda';

        }
        if(! that.userDataFiltered.is_staff){
         that.esAdmin='Residente'
        }else{
          that.esAdmin='Admin';
        }
        if(! that.userDataFiltered.is_active){
          that.esActivo='Habilitado'
         }else{
           that.esActivo='Deshabilitado';
         }}
        console.log('OBjetos user datas ')
        that.userId=that.userData[i].id;
        that.userDataFiltered[0]=that.userDaata[i];
        console.log('  ')
        console.log('Se GUARDÓ')
        console.log('Correo guardado: '+that.userData[i].email+'\nNumero Objeto: '+i+"\nID Usuario: "+that.userId)
        if( !that.userDataFiltered.moroso){
          that.esMoroso ='Moroso';
        }else{
          that.esMoroso='Sin deuda';

        }
        if(! that.userDataFiltered.is_staff){
         that.esAdmin='Residente'
        }else{
          that.esAdmin='Admin';
        }
        if(! that.userDataFiltered.is_active){
          that.esActivo='Habilitado'
         }else{
           that.esActivo='Deshabilitado';
         }
        
        
        
        console.log('  ')
      }
    }
     
  }catch(e){
    console.log('Error api: '+e )
  }
}
async makeAReserva(){
  const that = this ; 
  try{
    
    var a=0;
    const date=that.dateTime.toString();
    const duracion=this.minutos;
    const estado='R';
    const idEspacio=this.idEspacioComun;
    const ownedID=this.userId;
    console.log('Datos enviados:\ninicio reserva: '+date+"\nDuracion: "+duracion+"\nEstado: "+estado+"\nID espacio: "+idEspacio+"\nID usuario: "+ownedID)
      
    const response:any = await that.api.postReservas(date,duracion,estado,idEspacio,ownedID);
    const largo=Object.keys(response).length;    
    if(largo >= 5 ){
      console.log(' Message : Funcionó  ');
      
      that.loading_controllee();
      that.maiin();
      that.presentToast('Reserva creada exitosamente ');
      location.reload();
      that.presentAlertt();
      that.borrar_html=true;
     

    }else{
  

    that.presentToast('Datos incompletos')}
    


  }catch(e){
    console.log(e)
  }
}
transformTimeToHourss(time : any) {
  const var1=new Date();
  time.toString();
  



  if(time == '15 Minutos'){
    var1.setHours(parseInt('00'),parseInt('15'),parseInt('00'));
    
    
    const sumaHora=var1.getHours();
    const sumaMinutos= var1.getMinutes();
    const sumaSegundos=var1.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);
    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;

  }else if(time == '30 Minutos'){
    var1.setHours(parseInt('00'),parseInt('30'),parseInt('00'));
    
    
    const sumaHora=var1.getHours();
    const sumaMinutos= var1.getMinutes();
    const sumaSegundos=var1.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);
    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;
    
  }else if(time == '1 Hora'){
    var1.setHours(parseInt('01'),parseInt('00'),parseInt('00'));
    
    
    const sumaHora=var1.getHours();
    const sumaMinutos= var1.getMinutes();
    const sumaSegundos=var1.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);
    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;
    
  }else if(time == '2 Horas'){
    var1.setHours(parseInt('02'),parseInt('00'),parseInt('00'));
    
    
    const sumaHora=var1.getHours();
    const sumaMinutos= var1.getMinutes();
    const sumaSegundos=var1.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);
    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;
    
  }
  


  
  return 

}

 waitWithSetTimeout(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

async  maiin() {
  const that=this;
  await that.waitWithSetTimeout(3000); // Esperar 3 segundos (3000 milisegundos)
  console.log("Después de esperar 3 segundos.");
}

Navegar() { 
  const parametros: NavigationExtras={
    state:{
   correo: this.co,
   contra:this.con,
   token : this.tok



    }
  }
  this.router.navigate(['Fabs/tab3'],parametros)


}

async presentAlert() {
  const alert = await this.alert.create({
    header: 'Notificación',
    subHeader: 'Bienvenido: \n'+this.nombre_usuario.split('.')[0]+'\t',
  
    message: 'Disfruta de reservado.com',
    buttons: ['navegar'],
  });

  await alert.present();
}

async presentAlertt() {
  const alert = await this.alert.create({
    header: 'Notificación',
    subHeader: 'Reserva creada con exito!',
  
    message: 'Sigue en reservado.com',
    buttons: ['OK'],
  });

  await alert.present();
}
  
swiperReady(){
  this.swiper=this.swiperRef?.nativeElement.swiper;
}
goNext(){
  this.swiper?.slideNext();
}
goPrev(){
  this.swiper?.slidePrev();
}
swiperSlideChanged(e:any){
  console.log('changed',e);
}

ocultar(){
  location.reload();

}
//Logica Pagina Tab1
  




 transformTimeToHours(time: string): string {
  const var1=new Date();
  const var2=new Date();
  

  var hora=0;
  var minutos=0;
  var segundos=0;
  
  if(time.includes('15') ==true ){
    var1.setHours(hora,parseInt('15'),segundos);
  }
  
  else if(time.includes('30') ==true ){
    var1.setHours(hora,parseInt('30'),segundos);
  }
  else if(time.includes('01') ==true ){
    var1.setHours(parseInt('01'),minutos,segundos);
  }
  else if(time.includes('02') ==true ){
    var1.setHours(parseInt('02'),minutos,segundos);
  }
   
  

     
    const sumaHora=var1.getHours();
    const sumaMinutos= var1.getMinutes();
    const sumaSegundos=var1.getSeconds();
    
    const sumaCompleta=new Date();
    sumaCompleta.setHours(sumaHora,sumaMinutos,sumaSegundos);

    const fechaFormateada=sumaCompleta.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    return fechaFormateada;



 }



 logOut(){
  
  this.router.navigate([''])
  this.api.validador=false;
 }
 menuUsuario(){
  if(this.activo){
    this.esActivo='Habilitado';
  }else{
    this.esActivo='Deshabilitado';
  }
  if(this.moroso){
    this.esMoroso='Moroso'
  }else{
    this.esMoroso='Sin deuda'
  }
  if(this.admin){
    this.esAdmin='Administraor'
  }else{
    this.esAdmin='Residente'
  }
 }
}


  /**
 {
    "inicio":"2023-07-01T06:00:00-04:00",
    "duracion": "00:15:00",
    "estado" : "R",
    "espacio" : 1,
    "usuario":3 

}

  **/
