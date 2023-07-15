import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import { resolve } from 'dns';
import { Router,NavigationExtras} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

//API service manager 
export class ApiService {
  lista = [this.updateLogin()]
  // const lista:any=[this.esActivo,this.esAdmin,this.esMoroso]
  public listaa=[this.updateuserTab1()]
  
  public esMoroso:string=this.listaa[2];
  public esAdmin:string=this.listaa[1];
  public esActivo:string=this.listaa[0];

  public      userData:any=this.lista[5];
  public     userID:any=this.lista[4];
  public     nombre:string=this.lista[3];
  public    token_a:string=this.lista[2];
  public contrasena:string=this.lista[1];
  public     correo:string=this.lista[0];
  


  
  ruta: string = 'http://34.125.248.124:8000/api/auth/';
  edificios='http://127.0.0.1:5000/api/edificio';
  rutaComunidad='http://34.125.248.124:8000/api/comunidades';
  rutaEspacioComun='http://34.125.248.124:8000/api/espaciocomun/'
  rutaDetalleEspacioComun='http://34.125.248.124:8000/api/ecdetail/'
  rutaConsultarReservas='http://34.125.248.124:8000/api/reservas/';
  rutaUsuario='http://34.125.248.124:8000/api/usuario/'
  startReserva='http://34.125.248.124:8000/api/reserva_start/'
  validador: boolean = false;
  logIn: boolean = false;
  constructor(
     private http: HttpClient
    ,private router:Router


  ) {

  }
//actualizar variables 
getvars(correo:string, contrasena:string, token_a:string,nombre:string,userID:any,userData:any){
  if(correo != ''){
    this.correo=correo
    }else{
      correo='error vacio'
    }
    if(contrasena != ''){
      this.contrasena=contrasena;
    }else{
      this.contrasena='error vacio'
    }
    if(token_a != ''){
      this.token_a=token_a;
    }else{
      this.token_a='';
    }
    if(nombre != ''){
      this.nombre=nombre;
    }else{
    this.nombre='error vacio'
    }
    if(userID != ''){
      this.userID=userID;
    }else{
      this.userID='Error vacio'
    }
    
    const largo:any=Object.keys(userData).length;
    if(largo >=1 ){
      this.userData=userData;
    }else{
      this.userData='ERROR VACIO'
    }
    console.log('Api service LOG = {\nCorreo: '+this.correo+"\nContraseña: "+this.contrasena+"\ntoken: "+this.token_a+"\nUserID:"+this.userID+"\nUserData: "+this.userData+"}" )
    const lista =[this.correo,this.contrasena,this.token_a,this.nombre,this.userID,this.userData];
    console.log('Lista de mierda: '+lista);
    this.updateLogin();
return lista;
}
updateLogin(){
  this.correo=this.correo;
  this.contrasena=this.contrasena;
  this.token_a=this.token_a;
  this.nombre=this.nombre;
  this.userID=this.userID;
  this.userData=this.userData;

const lista:any =[this.correo,this.contrasena,this.token_a,this.nombre,this.userID]
console.log('Lista de mierda: '+lista);
return lista
}
updateuserData(esActivo:boolean,esAdmin:boolean,esMoroso:boolean){
  if(esActivo){
    this.esActivo='Habilitado'
  }else{
    this.esActivo='Deshabilitado'
  }
  if(esAdmin){
    this.esAdmin='Administrador'
  }else{
    this.esAdmin='Residente'
  }
  if(esMoroso){
    this.esMoroso='Moroso'
  }else{
    this.esMoroso='Sin mora'
  }
  this.updateuserTab1()
  

}
updateuserTab1(){
  this.esActivo=this.esActivo;
  this.esAdmin=this.esAdmin;
  this.esMoroso=this.esMoroso;
  const lista:any=[this.esActivo,this.esAdmin,this.esMoroso]

  return lista
}
//canActivate
canActivate(){
    
  if (this.validador){
    return true;
  }
  else
  {
    this.router.navigate(['login'])
    return false;
  }
}

//canActivate

//Validar Credenciales 
  ValidateApiService(correo: string, contra: string) {
    let that = this;
    const body = {
      email: correo,
      password: contra
    };
    return new Promise(resolve => {
      resolve(that.http.post(that.ruta, body).toPromise())
    })
  }
//Validar Credenciales 

//Listar Edificios 
getData() {
    let that = this;
    const gruposs='2'
    const ide='3'
    const body = {
      id: ide,
      cadena: gruposs
    };
    return new Promise(resolve => {
      resolve(that.http.post(that.edificios, body).toPromise())
    })
  }

//Listar Edificios 



  //Listar Comunidad
  listComunidad(){
    let that= this;
  
    
    return new Promise(resolve => {
      resolve(that.http.get(that.rutaComunidad).toPromise())
    });
  }
  //Listar Comunidad
  



//Listar Espacio Común
  listEspacios(){
    let that=this;


    return new Promise(resolve => {
      resolve(that.http.get(that.rutaEspacioComun).toPromise())
    });
  }
//Listar Espacio Común


//Listar detalle de espacioComun
getDetalleEspacio( id:string){
  let that= this;

  return new Promise(resolve => {
    resolve(that.http.get(that.rutaDetalleEspacioComun+id).toPromise())
  });
};
//Listar detalle de espacioComun



//Listar reservas (para validaciones )
getReservas(){
  let that=this;


  return new Promise(resolve =>{
    resolve(that.http.get(that.rutaConsultarReservas).toPromise())
  });
};
//Listar reservas (para validaciones )



postReservas(inicioo:string,duracionn:string,estadoo:string,espacioo:string,usuarioo:string){
  const that=this
  
  const body = {
    inicio   :  inicioo,
    duracion :  duracionn,
    estado   :  estadoo,
    espacio  :  espacioo,
    usuario  :  usuarioo
  };
  return new Promise(resolve => {
    resolve(that.http.post(that.rutaConsultarReservas, body).toPromise())
  })

}
getUsuario(){
  let that= this; 
  
  return new Promise(resolve =>{
    resolve(that.http.get(that.rutaUsuario).toPromise())
  });
  
}

canTrigger(){
  this.validador=true;
}
// let that = this;
// const body = {
//   email: correo,
//   password: contra
// };
// return new Promise(resolve => {
//   resolve(that.http.post(that.ruta, body).toPromise())
// })
iniciarReserva(id:string,espacioCom:string){
  let that= this;
  
    const body={
      user_id:id,
      espacio_id:espacioCom
    };
    return new Promise(resolve =>{
      resolve(that.http.post(that.startReserva,body).toPromise)
    })
  
    console.log('Error api: ')
  
}

}





//API service manager 
/**
 {
    "inicio":"2023-07-01T06:00:00-04:00",
    "duracion": "00:15:00",
    "estado" : "R",
    "espacio" : 1,
    "usuario":3 

}

  **/