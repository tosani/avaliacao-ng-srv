import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaPageComponent } from './pessoa-page/pessoa-page.component';

const routes: Routes = [
  {
    path: '', component: PessoaPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
