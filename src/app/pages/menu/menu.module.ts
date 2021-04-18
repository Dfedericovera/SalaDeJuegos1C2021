import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { HeaderComponent } from "../../components/header/header.component";
import { CarouselComponent } from 'src/app/components/carousel/carousel.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    HeaderComponent,
    CarouselComponent,
    MenuRoutingModule
  ]
})
export class MenuModule { }
