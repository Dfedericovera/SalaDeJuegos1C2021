import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostI } from '../../interface/post';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-sala-de-chat',
  templateUrl: './sala-de-chat.component.html',
  styleUrls: ['./sala-de-chat.component.scss']
})
export class SalaDeChatComponent implements OnInit {

  posts: Observable<PostI[]>
  title:string;
  content:string;
  post:PostI;
  constructor(
    private chatService:ChatService
  ) {
    this.chatService.getPosts().subscribe(value=>{
      this.posts = value;
      console.log("POSTS",this.posts);
    });
    
   }

  ngOnInit(): void {
  }

  addPost() {
    this.post = {
      contenido: this.content,
      usuario: JSON.parse(localStorage.getItem('user')).email,
      timestamp: Date.now(),
    }
    this.chatService.createPost(this.post).then(value=>{
      console.log(value);
    }
    );
  }

  getPost(postId) {
  }



}
