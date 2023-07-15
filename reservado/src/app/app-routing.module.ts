import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { LoginPage } from './pages/login/login.page';
import { ApiService } from './services/api.service';


const routes: Routes = [
  {
    path: 'Tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),canActivate: [ApiService]
  },
  {
    path: 'Fabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),canActivate: [ApiService]
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),canActivate: [ApiService]
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule),canActivate: [ApiService]
      },
      {
        path: 'tab4',
        loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule),canActivate: [ApiService]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tab44',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule),canActivate: [ApiService]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/fix/fix.module').then( m => m.FixPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./pages/qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
