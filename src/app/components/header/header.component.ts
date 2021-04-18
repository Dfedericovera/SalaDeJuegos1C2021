import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  email:string;

  constructor(private authService:AuthService) {
    this.email = JSON.parse(localStorage.getItem('user')).email;
   }

  ngOnInit(): void {
  }

}
