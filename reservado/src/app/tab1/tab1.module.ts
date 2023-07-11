import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    

  ],
  declarations: [Tab1Page,UserMenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  
})
export class Tab1PageModule {}
