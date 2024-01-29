import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../article.model';
import { ArticleService } from '../services/article.service';
import { TitleService } from '../services/title.service';

@Component({
    selector: 'app-root',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent {
    currentPath: String | undefined;
    article: Article | undefined | false;
    title = 'article-component';

    constructor(
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private titleService: TitleService
    ) { }

    ngOnInit(): void {
        this.currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');

        this.articleService.getArticle(this.currentPath).subscribe((data) => {
            if(data.content && data.title) {
                this.titleService.setTitle(data.title);
                this.article = data;
            } else {
                this.article = false;
                this.titleService.setTitle("Article Not Found - Clarify Wiki");
            }
        });
    }
}
