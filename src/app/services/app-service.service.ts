import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
baseUrl = 'http://0.0.0.0:3000'
postEndpoint = '/api/v1/posts';

  constructor(private http: HttpClient) { }

  listPosts(): Observable<any>{
    return this.http.get(`http://localhost:3000/api/v1/posts`)
  }

  deletePost(item: any): Observable<any>{
    return this.http.delete(`http://localhost:3000/api/v1/posts/`+`${item.id}`)
  }
}

