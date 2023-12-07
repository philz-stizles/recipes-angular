import { Injectable } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

export interface Post {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  baseUrl = 'https://devdezyn-f8967-default-rtdb.firebaseio.com/';
  postSelected = new Subject<Post>();
  postsChanged = new Subject<Post[]>();
  postError = new Subject<string>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) {}

  createAndStorePost(post: Post) {
    return this.http
      .post(`${this.baseUrl}/posts.json`, post, {
        headers: new HttpHeaders({ 'Some-Header-Key': 'Some header value' }),
      })
      .pipe(
        map((response: { [key: string]: any }) => {
          return Object.keys(response).map((id) => ({
            ...response[id],
            id,
          }));
        })
      );
  }

  fetchPosts() {
    return this.http
      .get(`${this.baseUrl}/posts.json`, {
        headers: new HttpHeaders({ 'Some-Header-Key': 'Some header value' }),
        params: new HttpParams().set('page', 1).set('limit', 10), // This could be done in the URL directly as well
        // `${this.baseUrl}/posts.json?limit=10`
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  fetchPost(id: string) {
    return this.http
      .get(`${this.baseUrl}/${id}/posts.json`, {
        headers: new HttpHeaders({ 'Some-Header-Key': 'Some header value' }),
        params: new HttpParams({}),
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  editPost(index: number, post: Post) {
    this.posts[index] = post;
    this.postsChanged.next(this.posts.slice());
  }

  deletePost(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}/posts.json`);
  }

  clearPosts() {
    return this.http
      .delete(`${this.baseUrl}/posts.json`, {
        observe: 'events', // [ 'body' | 'response' | 'event' ] - body by default.
        // Use the observe to set what http returns from the request
        responseType: 'json', // [ 'json', 'text' ] - 'json' by default.
        // 'json' tells Angular to automatically parse the response into a js Object.
        // 'text' tells Angular not to try to parse the response into a js Object, but to treat as text.
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
          }

          if (event.type === HttpEventType.DownloadProgress) {
          }

          if (event.type === HttpEventType.UploadProgress) {
          }

          if (event.type === HttpEventType.ResponseHeader) {
          }

          if (event.type === HttpEventType.User) {
          }

          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
