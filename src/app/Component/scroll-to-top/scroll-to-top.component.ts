import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent {
windowsScrolled = false
constructor (@Inject(DOCUMENT) private document : Document){ }

@HostListener('window:scroll',[])

onWindowScroll(): void {
  const scrollPosition = window.scrollY  || this.document.documentElement.scrollTop  || this.document.body.scrollTop  || 0;

  if (scrollPosition > 100) {
    this.windowsScrolled = true;
  } else {
    this.windowsScrolled = false;
  }
}
scrollTop(){
  this.document.documentElement.scrollTo({top:0, behavior: 'smooth'})
  this.document.body.scrollTo({top:0, behavior: 'smooth'})

}

}
