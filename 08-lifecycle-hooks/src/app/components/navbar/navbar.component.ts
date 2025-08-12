import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  // Asi podemos usar los Styles propios de angular
  styles: `
    nav {
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    .active {
      color: #341162;
      font-weight: bold;
    }
  `
})
export class NavbarComponent { }
