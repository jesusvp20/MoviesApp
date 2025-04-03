import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PeliculasServiceService } from '../../Services/peliculas-service.service';
import { Movie } from '../../Interface/Cartelera.interface';
import { SlidershowComponent } from '../../Component/slidershow/slidershow.component';
import { BannersPeliculasComponent } from '../../Component/banners-peliculas/banners-peliculas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SlidershowComponent, BannersPeliculasComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies:Movie[] = []
  loadMoviesIds = new Set<number>();  



  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const totalHeight = document.documentElement.scrollHeight;
    const threshold = 100; 
    if (scrollPosition + viewportHeight >= totalHeight - threshold) {
      this.loadMoreMovies();
    }
  }
  
  constructor(private peliculas_service: PeliculasServiceService) {

    this.peliculas_service.resetPelicula();
  } 

  ngOnInit(): void {
   this.loadMovies()
  }

  loadMoreMovies(){
    this.peliculas_service.getCartelera().subscribe(res => {
      const newMovies = res.filter(movie => !this.loadMoviesIds.has(movie.id));
      this.movies.push(...newMovies);
      this.updatteLoadedMovies();
    });
  }
  

  loadMovies(){
    this.peliculas_service.getCartelera().subscribe(response => {
      this.movies = response;
      this.updatteLoadedMovies()
    });
  }

updatteLoadedMovies(){
this.movies.forEach(movie => this.loadMoviesIds.add(movie.id))
}








}
