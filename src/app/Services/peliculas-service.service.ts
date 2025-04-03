import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../Interface/Cartelera.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Cast, Credits } from '../Interface/credits.interface';
import { Movie_Details } from '../Interface/Details.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasServiceService {
  private URL = 'https://api.themoviedb.org/3';
  private ApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2FmMGI0MGY5OTJmYWU1NDY2MmVkNzQwNjM2YTQxMSIsIm5iZiI6MTc0MzAwMjEzNC40MTgsInN1YiI6IjY3ZTQxYTE2ZDQwNTJmNDc5M2RjYjQ4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BKWNiw67m2y9M2-CbVTZsaKzEel79nwFivjwn3DSNTw'; // Mantén tu key real aquí
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.ApiKey}` 
  });
private carteleraPage = 1
public Cargando = false

  constructor(private http: HttpClient) { }

  getCartelera(): Observable<Movie[]> {
    if (this.Cargando) {
      return of([]);
    }
    this.Cargando = true;
  
    return this.http.get<CarteleraResponse>(
      `${this.URL}/movie/now_playing?language=es-ES&page=${this.carteleraPage}`, { headers: this.headers }
    ).pipe(
      map((response: any) => response.results),
      tap(() => {
        this.carteleraPage += 1;
        this.Cargando = false;
      })
    );
  }
  
 buscarPeliculas(texto: string): Observable<Movie[]> {
  return this.http.get<CarteleraResponse>( `${this.URL}/search/movie?query=${texto}&language=es-ES&page=1`,{ headers: this.headers }).pipe(
    map(response => response.results)
  );
}

peliculaDetalles(id: string) {
  return this.http.get<Movie_Details>(`${this.URL}/movie/${id}?language=es-ES`, { headers: this.headers }).pipe(
    catchError(err => of(null))
  );
}

PeliculaCreditos(id: string): Observable<Cast[] | null> {
  return this.http.get<Credits>(`${this.URL}/movie/${id}/credits?language=es-ES`, { headers: this.headers }).pipe(
    map(res => res.cast),
    catchError(error => of(null))
  );
}

resetPelicula(){
  this.carteleraPage = 1;
}
}