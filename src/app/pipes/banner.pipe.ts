import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'banner',
  standalone: true
})
export class BannerPipe implements PipeTransform {

  transform(banner: string ): string {
    if(banner){
      return `https://image.tmdb.org/t/p/w500/${banner}`

    }else{
      return 'assets/noImage.png';
    }
  }

}
