import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';
import { ArticleComponent } from './article/article.component';
import { ArticleService } from './services/article.service';
import { TableContainerDirective } from './table-container.directive';
import { TitleService } from './services/title.service';
import { StartPageComponent } from './startpage/startPage.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    TableContainerDirective,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot()
  ],
  providers: [ArticleService, TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
