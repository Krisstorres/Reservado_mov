import { ObjectUnsubscribedError, elementAt } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Console } from 'console';
import { Component,  OnInit, ViewChild, ElementRef,Input} from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import {  LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Token } from '@angular/compiler';
import * as jwt from 'jsonwebtoken';
import { AlertController } from '@ionic/angular';
import {Swiper} from 'swiper';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
//import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
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
  codigo:string='';
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
   //,private barcodeScanner: BarcodeScanner
              
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

  };


  openCamera(){
    const that = this ;
    
  
      try {
        //this.barcodeScanner.scan().then(barcodeData => {
         // that.codigo=barcodeData.text;
         // that.api.enviarQr(that.codigo)
          //console.log('Barcode data', barcodeData);
       
   
       
      } catch (error) {
        console.log('error de QR SCANNER');
        //TODO INDICAR QUE OCURRIÓ UN ERROR CON LA API
      }
 
  
  }



  logOut(){
    const parametros: NavigationExtras={
      state:{
        correo : this.co,
        contrasena : this.con,
        token_a : this.tok,
        nombre : this.nombre_usuario,
        userID:this.userId,
        userData:this.userData,
        esmoroso:this.esMoroso,
        esAdmin:this.esAdmin,
        esActivo:this.esActivo


      }}
    
    this.router.navigate(['Fabs/tab1'],parametros)
  }
  }