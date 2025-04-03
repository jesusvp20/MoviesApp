import { AfterViewInit, Component, Input } from '@angular/core';
import { Cast } from '../../Interface/credits.interface';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common';
import { BannerPipe } from '../../pipes/banner.pipe';

@Component({
  selector: 'app-cast-slide-show',
  standalone: true,
  imports: [CommonModule, BannerPipe],
  templateUrl: './cast-slide-show.component.html',
  styleUrls: ['./cast-slide-show.component.css']
})
export class CastSlideShowComponent implements AfterViewInit {

  @Input() cast?: Cast[];


  ngAfterViewInit(): void {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }
}
