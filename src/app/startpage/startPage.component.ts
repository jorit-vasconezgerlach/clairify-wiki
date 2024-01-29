import { Component, ElementRef, Renderer2 } from '@angular/core';

import { Article } from '../article.model';
import { ArticleService } from '../services/article.service';

@Component({
    selector: 'start-page',
    templateUrl: './startPage.component.html',
    styleUrls: ['./startPage.component.scss'],
})

export class StartPageComponent {
    articles: Article[] | undefined;
    filteredArticles: Article[] | undefined;
    searchTerm: string = '';

    maxResults: number = 5;

    constructor (
        private articleService: ArticleService,
        private renderer: Renderer2, private el: ElementRef
    ) { }

    ngOnInit(): void {
        this.articleService.getAllArticles().subscribe((data)=>{
            this.articles = data;
            console.log(data);
        })
    }

    search(): void {
        if (!this.articles || this.searchTerm.trim() === '') {
            this.filteredArticles = []; // Empty the filtered articles if the search term is empty
        } else {
            this.filteredArticles = this.articles
                .filter(article =>
                    article.title.toLowerCase().includes(this.searchTerm.toLowerCase())
                ).slice(0, this.maxResults); // Limit to the top results
        }
    
        this.updateArticleList();
    }
    
    updateArticleList(): void {
        const resultsContainer = this.el.nativeElement.querySelector('.results');
        this.renderer.setProperty(resultsContainer, 'innerHTML', '');
    
        this.filteredArticles?.forEach(article => {
            const a = this.renderer.createElement('a');
    
            // Create a span for each word in the title, highlighting the matching parts
            article.title.split(' ').forEach(word => {
                const span = this.renderer.createElement('span');
                const lowerCaseWord = word.toLowerCase();
                const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    
                if (lowerCaseWord.includes(lowerCaseSearchTerm)) {
                    // Find all occurrences of the search term in the word
                    const matches = [];
                    let index = lowerCaseWord.indexOf(lowerCaseSearchTerm);
                    while (index !== -1) {
                        matches.push({ start: index, end: index + lowerCaseSearchTerm.length });
                        index = lowerCaseWord.indexOf(lowerCaseSearchTerm, index + 1);
                    }
    
                    // Split the word into non-matching and matching parts
                    let lastIndex = 0;
                    matches.forEach(match => {
                        const beforeMatch = this.renderer.createText(word.slice(lastIndex, match.start));
                        const matchText = this.renderer.createElement('span');
                        this.renderer.addClass(matchText, 'highlight');
                        this.renderer.appendChild(matchText, this.renderer.createText(word.slice(match.start, match.end)));
                        this.renderer.appendChild(span, beforeMatch);
                        this.renderer.appendChild(span, matchText);
                        lastIndex = match.end;
                    });
    
                    // Add the remaining non-matching part
                    const remaining = this.renderer.createText(word.slice(lastIndex));
                    this.renderer.appendChild(span, remaining);
                    this.renderer.appendChild(a, span);
                } else {
                    this.renderer.appendChild(span, this.renderer.createText(word + ' '));
                    this.renderer.appendChild(a, span);
                }
            });
    
            this.renderer.setAttribute(a, 'href', '/' + article.path);
            this.renderer.appendChild(resultsContainer, a);
        });
    }
    
    
}
