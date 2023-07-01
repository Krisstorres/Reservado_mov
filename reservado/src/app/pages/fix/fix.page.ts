import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-fix',
  templateUrl: './fix.page.html',
  styleUrls: ['./fix.page.scss'],
})
export class FixPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  


  navegar(){
    this.router.navigate(['Fabs/tab1'])
  }

}
