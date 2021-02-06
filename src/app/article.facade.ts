import { ArticleService } from './article.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacade {
  private articleList = new Subject();
  private selectedArticle = new Subject();
  private mutations = new Subject();

  articleList$ = this.articleList.asObservable();
  selectedArticle$ = this.selectedArticle.asObservable();
  mutations$ = this.mutations.asObservable();

  constructor(private articleService: ArticleService) {}

  reset() {
    this.mutations.next(true);
  }

  selectArticle(article) {
    this.selectedArticle.next(article);
  }

  loadArticleList() {
    this.articleService
      .getAll()
      .subscribe((articles) => this.articleList.next(articles));
  }

  saveArticle(article) {
    if (article._id) {
      this.articleService.updateOne(article).subscribe((data) => this.reset());
    } else {
      this.articleService.createOne(article).subscribe((data) => this.reset());
    }
  }

  deleteArticle(id) {
    this.articleService.deleteOne(id).subscribe((data) => this.reset());
  }
}
