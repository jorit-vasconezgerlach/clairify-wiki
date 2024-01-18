import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { MarkdownService } from 'ngx-markdown';

import { Article } from '../article.model';

@Component({
    selector: 'app-root',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
    article: Article = {
        _id: "",
        title: "Error",
        author: {
            id: "",
            name: "Error",
        },
        content: "",
        tags: [],
        path: '',
        created_at: new Date("23-01-2004"),
    };
    renderedMarkdown: string = "something";

    title = 'article-component';

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private markdownService: MarkdownService
    ) { }

    ngOnInit(): void {
        const path = this.route.snapshot.params['path'];
        this.articleService.getArticle(path).subscribe(article => {
            this.article = article;
            this.renderedMarkdown = this.markdownService.compile(article.content || '');
        });
    }
}
