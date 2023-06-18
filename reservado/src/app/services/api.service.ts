import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ruta: string = 'http://34.125.248.124:8000/api/auth/';
  edificios='http://127.0.0.1:5000/api/edificio';
  rutaComunidad='http://34.125.248.124:8000/api/comunidades/1';
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



  //GET COMININDAD 
  listComunidad(token:any){
    let that= this;
  
    return new Promise(resolve => {
      resolve(that.http.get(that.rutaComunidad,token).toPromise())
    });
  }

  //GET COMININDAD 
}

