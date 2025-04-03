import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
constructor(private route: Router){}

ngOnInit(): void {
  
}
buscarPelicula(texto:string){
    texto = texto.trim()
    if(texto.length === 0){
      return
    }
    this.route.navigate(['/buscar',texto])
}
  goHome(url:string){
    this.route.navigate([url])
  }
}
