import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
baseUrl = 'http://localhost:3000'
postEndpoint = '/api/v1/posts';

  constructor(private http: HttpClient) { }

  listPosts(): Observable<any>{
    return this.http.get(`http://localhost:3000/api/v1/posts`)
  }

  createPost(item: any): Observable<any>{
    return this.http.post(this.baseUrl+this.postEndpoint, item)
  }

  updatePost(item: any): Observable<any>{
    return this.http.put(`${this.baseUrl}${this.postEndpoint}`+'/'+`${item.id}`, item)
  }

  deletePost(item: any): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/v1/posts/`+`${item.id}`)
  }
}

