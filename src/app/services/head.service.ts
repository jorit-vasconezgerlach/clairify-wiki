import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class HeadService {
    
    constructor(
        private title: Title,
        private meta: Meta,
    ) {}

    setTitle(newTitle: string) {
        this.title.setTitle(newTitle);
    }

    setLanguage(lang: string) {
        document.documentElement.lang = lang;
    }

    setDescription(description: string): void {
        this.meta.updateTag({ name: 'description', content: description });
    }

    setCanonicalUrl(canonicalUrl: string): void {
        const existingCanonicalTag = document.head.querySelector('link[rel="canonical"]');
    
        if (existingCanonicalTag) {
            existingCanonicalTag.setAttribute('href', canonicalUrl);
        } else {
            const canonicalTag = document.createElement('link');
            canonicalTag.setAttribute('rel', 'canonical');
            canonicalTag.setAttribute('href', canonicalUrl);
            document.head.appendChild(canonicalTag);
        }
    }
    
    setKeywords(keywords: string): void {
        this.meta.updateTag({ name: 'keywords', content: keywords });
    }
}