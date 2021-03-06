import { Component,  Output, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../posts.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = "";
  enteredTitle = "";
  private mode = 'create';
  private postId: string;
  public post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.paramMap.subscribe(( paramMap: ParamMap) =>{
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getPost(this.postId);
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }


  onAddPost(form: NgForm) {
    if (form.invalid){
      return;
    }
    //old way of creating a new post
    // const post: Post =
    // {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    //now using a service to hold the post array
    this.postsService.addPost(form.value.title, form.value.content)
    form.resetForm();
  }

}
