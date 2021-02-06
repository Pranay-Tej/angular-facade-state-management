import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.getUrl());
  }

  getOne(id) {
    return this.http.get(this.getUrlWithId(id));
  }

  createOne(article) {
    return this.http.post(this.getUrl(), article);
  }

  updateOne(article) {
    return this.http.put(this.getUrlWithId(article._id), article);
  }

  deleteOne(id) {
    return this.http.delete(this.getUrlWithId(id));
  }

  // utils
  getUrl() {
    return `${environment.api_url}/articles`;
  }

  getUrlWithId(id) {
    return `${environment.api_url}/articles/${id}`;
  }
}
