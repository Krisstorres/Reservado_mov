import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
     private router : Router
    ,private api:ApiService
  ) {}

  tab1Nav(){
     const parametros: NavigationExtras={
      state:{
        correo:this.api.correo
       ,contrasena: this.api.contrasena
       ,token_a: this.api.token_a
       ,nombre:this.api.nombre
       ,userID:this.api.userID
       ,userData:this.api.userData
       ,esmoroso:this.api.esMoroso
       ,esAdmin:this.api.esAdmin
       ,esActivo:this.api.esActivo

   }}
     this.router.navigate(['Fabs/tab1'],parametros)
    
  }
  
  tab2Nav(){
    const parametros: NavigationExtras={
      state:{
        correo:this.api.correo
       ,contrasena: this.api.contrasena
       ,token_a: this.api.token_a
       ,nombre:this.api.nombre
       ,userID:this.api.userID
       ,userData:this.api.userData
       ,esmoroso:this.api.esMoroso
       ,esAdmin:this.api.esAdmin
       ,esActivo:this.api.esActivo

   }}
     this.router.navigate(['Fabs/tab2'],parametros)

  }
  
  tab3Nav(){
    const parametros: NavigationExtras={
      state:{
        correo:this.api.correo
       ,contrasena: this.api.contrasena
       ,token_a: this.api.token_a
       ,nombre:this.api.nombre
       ,userID:this.api.userID
       ,userData:this.api.userData
       ,esmoroso:this.api.esMoroso
       ,esAdmin:this.api.esAdmin
       ,esActivo:this.api.esActivo

   }}
     this.router.navigate(['Fabs/tab3'],parametros)

  }
  
  tab4Nav(){
    const parametros: NavigationExtras={
      state:{
          correo:this.api.correo
         ,contrasena: this.api.contrasena
         ,token_a: this.api.token_a
         ,nombre:this.api.nombre
         ,userID:this.api.userID
         ,userData:this.api.userData
         ,esmoroso:this.api.esMoroso
         ,esAdmin:this.api.esAdmin
         ,esActivo:this.api.esActivo

     }}
     this.router.navigate(['Fabs/tab4'],parametros)

  }
}
