import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartPageComponent } from './startpage/startPage.component';
import { ArticleComponent } from './article/article.component';
import { ArticleEditComponent } from './article/edit/articleEdit.component';
import { ArticlePlainComponent } from './article/plain/articlePlain.component';
import { ArticleNewComponent } from './article/new/articleNew.component';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: ':path', component: ArticleComponent},
  { path: ':path/edit', component: ArticleEditComponent },
  { path: ':path/plain', component: ArticlePlainComponent },
  { path: 'new', component: ArticleNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
