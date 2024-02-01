import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article } from '../article.model';
import { ArticleService } from '../services/article.service';
import { HeadService } from '../services/head.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ArticleComponent implements OnInit {
    currentPath: String | undefined;
    article: Article | undefined | false;
    title = 'article-component';

    constructor(
        private articleService: ArticleService,
        private route: ActivatedRoute,
        private titleService: HeadService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.currentPath = this.route.snapshot.url.map(segment => segment.path).join('/');

        this.articleService.getArticle(this.currentPath).subscribe((data) => {
            if(data.content && data.title) {
                this.titleService.setTitle(`${data.title} - Clarify Wiki`);
                this.titleService.setLanguage(`${data.language}`);
                this.titleService.setDescription(data.description);
                if(data.tags != null || data.tags != '') {
                    this.titleService.setKeywords(data.tags);
                }
                this.titleService.setCanonicalUrl('https://clarify.wiki' + this.location.path());
                this.article = data;
            } else {
                this.article = false;
                this.titleService.setTitle("Article Not Found - Clarify Wiki");
            }
        });
    }

    calculateReadTimeByCharacters(content: string, charactersPerMinute: number = 1000): string {
        const characters = content.length;
        const minutes = Math.ceil(characters / charactersPerMinute);

        if (minutes === 1) {
            return '1 minute';
        } else {
            return `${minutes} minutes`;
        }
    }
}
