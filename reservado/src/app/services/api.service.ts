import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

//API service manager 
export class ApiService {
  ruta: string = 'http://34.125.248.124:8000/api/auth/';
  edificios='http://127.0.0.1:5000/api/edificio';
  rutaComunidad='http://34.125.248.124:8000/api/comunidades';
  rutaEspacioComun='http://34.125.248.124:8000/api/espaciocomun/'
  rutaDetalleEspacioComun='http://34.125.248.124:8000/api/ecdetail/'
  rutaConsultarReservas='http://34.125.248.124:8000/api/reservas/';
  rutaUsuario='http://34.125.248.124:8000/api/usuario/'
  validador: boolean = false
  logIn:boolean=false;
  constructor(
    private http: HttpClient


  ) {

  }

//canActivate
canActivate(){
  
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
// let that = this;
// const body = {
//   email: correo,
//   password: contra
// };
// return new Promise(resolve => {
//   resolve(that.http.post(that.ruta, body).toPromise())
// })


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