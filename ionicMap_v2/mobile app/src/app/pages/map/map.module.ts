import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MapPage } from './map.page';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MapPage
      }
    ])
  ],
  declarations: [MapPage, GoogleMapsComponent]
})
export class MapPageModule {}
