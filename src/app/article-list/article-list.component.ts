import { ArticleFacade } from './../article.facade';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articleList$ = this.articleFacade.articleList$;
  selectedArticle$ = this.articleFacade.selectedArticle$;

  constructor(private articleFacade: ArticleFacade) {}

  ngOnInit(): void {
    this.reset();
    this.articleFacade.mutations$.subscribe((data) => this.reset());
  }

  reset() {
    this.loadArticles();
    this.selectArticle(null);
  }

  loadArticles() {
    this.articleFacade.loadArticleList();
  }

  selectArticle(article) {
    this.articleFacade.selectArticle(article);
  }

  deleteArticle(id) {
    this.articleFacade.deleteArticle(id);
  }
}
