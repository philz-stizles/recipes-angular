import { Post, PostsService } from './posts.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';

// This form uses Reactive Forms - make sure to import the ReactiveFormsModule
@Component({
  selector: 'app-posts',
  template: '<ul></ul>',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  isFetching = false;
  error: string | null = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts: Post[]) => {
        this.isFetching = false;
        this.posts = posts;
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  onDeletePost(id: string) {
    this.postService.deletePost(id).subscribe((response) => {
      // Responses are only sent when you subscribe
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  onClearPosts(event: Event) {
    this.postService.clearPosts().subscribe((response) => {
      // Responses are only sent when you subscribe
      this.posts = [];
    });
  }
}
