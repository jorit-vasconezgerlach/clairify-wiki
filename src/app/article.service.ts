import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://your-backend-api-url/articles';

  constructor(private http: HttpClient) { }

  getArticle(path: string): Observable<Article> {
    const url = `${this.apiUrl}/${path}`;
    return this.http.get<Article>(url);
  }
}
