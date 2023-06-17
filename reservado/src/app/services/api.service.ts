import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ruta: string = 'http://34.125.248.124:8000/api/auth/';
  validador: boolean = false

  constructor(
    private http: HttpClient
  ) {

  }


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

  /*
  validateUser(email:string, pasword:string){
    let that=this;
  
    that.validador = true;
      return new Promise(resolve => {
        resolve(that.http.post(that.ruta, {
          nombreFuncion: 'UsuarioLogin' ,
          parametros: [correo, contrasena]
        }).toPromise())
      })
  }*/
  getInfo(id:string,grupos:any){

  }

}

