import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent  implements OnInit {
  userData:any=[];
  userDataFiltered:any=[];
  storage_email=localStorage.getItem('email');
  userID:string='';
  corre:any;
  co:string='';
  tokken:any;
  tok:string='';
  nombr:any;
  nombre_usuario:string='';
  contra:any;
  con:string='';

  constructor(
            private api:ApiService
            ,private router:Router) { }

  ngOnInit() {
    try{

    }
    catch(e){
      console.log('Error Navigations Extras ')
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

      if( that.userData[i].email.toString()  != that.storage_email   ){
        console.log('no se guarda')
      }else{
        that.userID=that.userData[i].id;
        that.userDataFiltered[0]=that.userData[i];
        console.log('  ')
        console.log('Se GUARDÓ')
        console.log('Correo guardado: '+that.userData[i].email+'\nNumero Objeto: '+i+"\nID Usuario: "+that.userID)
        
        
        
        console.log('  ')
      }
    }
     
  }catch(e){
    console.log('Error api: '+e )
  }
}


}
