import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
PeliculasServiceService
import { ActivatedRoute } from '@angular/router';
import { PeliculasServiceService } from '../../Services/peliculas-service.service';
import { Movie } from '../../Interface/Cartelera.interface';
import { BannersPeliculasComponent } from "../../Component/banners-peliculas/banners-peliculas.component";

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, BannersPeliculasComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
texto = ''
movies: Movie[]= []
noMovie =''
constructor(private activateRoute : ActivatedRoute, private peliculasSvc: PeliculasServiceService){}

   ngOnInit(): void {
      this.activateRoute.params.subscribe(params => {this.texto = params['texto'];   
        
        this.peliculasSvc.buscarPeliculas(this.texto).subscribe((movies: Movie[]) => {
         this.movies = movies;
 
       // En el componente (buscar.component.ts)
          if (this.movies.length === 0) {
          this.noMovie = 'No se encontró la película 😔';
         } else {
          this.noMovie = ''; 
         }
    });
  });
}

}
