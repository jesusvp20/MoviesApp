import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Movie } from '../../Interface/Cartelera.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slidershow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slidershow.component.html',
  styleUrls: ['./slidershow.component.css']  // Notice plural 'styleUrls'
})
export class SlidershowComponent implements OnInit, AfterViewInit {

  @Input() movies?: Movie[];
  mySwiper?: Swiper;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.movies);  }

 
    ngAfterViewInit(): void {
      this.mySwiper = new Swiper('.swiper', {
        loop: true,
        keyboard: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        },
        a11y: {
          prevSlideMessage: 'Película anterior',
          nextSlideMessage: 'Siguiente película',
        },
        observer: true,
        observeParents: true
      });
    }
  
  
  showFullDescription: { [key: number]: boolean } = {};

  toggleDescription(movieId: number): void {
    this.showFullDescription[movieId] = !this.showFullDescription[movieId];
  }

  onSlidePrev(){
     this.mySwiper?.slidePrev();
  }

  onSlideNext(){
     this.mySwiper?.slideNext();
  }

  onMovieClick(movie: Movie){
    this.router.navigate(['/pelicula',movie.id])
  }
  
}
