import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasServiceService } from '../../Services/peliculas-service.service';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';
import { Movie_Details } from '../../Interface/Details.interface';
import { combineLatest } from 'rxjs';
import { Cast } from '../../Interface/credits.interface';
import { CastSlideShowComponent } from '../../Component/cast-slide-show/cast-slide-show.component';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, PipesModule, CastSlideShowComponent],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent implements OnInit {


  pelicula?: Movie_Details
 casting: Cast[] =[]
   constructor(private activateRoute:ActivatedRoute, private PeliculaService:PeliculasServiceService){}


ngOnInit(): void {
 const {id} = this.activateRoute.snapshot.params 
  combineLatest([
    this.PeliculaService.peliculaDetalles(id),
    this.PeliculaService.PeliculaCreditos(id)
  ]).subscribe(([movie,cast])=>{
         if(movie ===null || cast ===null){
          console.error("ERROR: la pelicula o el reparto no se encotraron")
          return; 
        }
        this.pelicula = movie;
        this.casting = cast
      })
}
getStars(voteAverage: number){
const starsCount = Math.floor(voteAverage)
return Array(starsCount).fill(0)

}
Regresar(){
  window.history.back()
}
}
