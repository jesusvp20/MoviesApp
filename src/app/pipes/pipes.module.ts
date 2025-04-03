import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerPipe } from './banner.pipe';



@NgModule({
  declarations: [],
  
  imports: [
    CommonModule,BannerPipe 
  ],
  exports: [BannerPipe]
})
export class PipesModule { }
