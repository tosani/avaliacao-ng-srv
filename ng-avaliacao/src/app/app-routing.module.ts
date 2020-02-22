import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent,
    children: [
      { path: '', loadChildren: './modules/pessoa/pessoa.module#PessoaModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
