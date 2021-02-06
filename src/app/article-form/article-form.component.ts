import { ArticleFacade } from './../article.facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup = this.formBuilder.group({
    _id: null,
    title: this.formBuilder.control(null, Validators.required),
    description: this.formBuilder.control(null, Validators.required),
    date: null,
    __v: null,
  });

  constructor(
    private formBuilder: FormBuilder,
    private articleFacade: ArticleFacade
  ) {}

  ngOnInit(): void {
    this.articleFacade.selectedArticle$.subscribe((data) => {
      if (data) {
        return this.articleForm.setValue(data);
      }
    });
  }

  saveArticle() {
    // console.log(this.articleForm.value)
    let article = this.articleForm.value;
    delete article.__v;
    this.articleFacade.saveArticle(article);
    this.articleForm.reset();
  }
}
