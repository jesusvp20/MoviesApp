import { Component, Input } from '@angular/core';
import { Movie } from '../../Interface/Cartelera.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-banners-peliculas',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './banners-peliculas.component.html',
  styleUrls: ['./banners-peliculas.component.css']
})
export class BannersPeliculasComponent {
  @Input() movies?: Movie[];

  currentPage: number = 1;
  pageSize: number = 8;

  constructor(private router: Router) { }

  getStars(voteAverage: number): number[] {
    const normalizedScore = voteAverage / 2;
    const starsCount = Math.round(normalizedScore);
    return Array(starsCount).fill(0);
  }

  onMovieClick(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }

  // Ahora usamos directamente el arreglo original (sin ordenar)
  get paginatedMovies(): Movie[] {
    if (!this.movies) return [];
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.movies.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return this.movies ? Math.ceil(this.movies.length / this.pageSize) : 0;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}
