import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToKanban = () => redirectLoggedInTo(['kanban']);
const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    ...canActivate(redirectLoggedInToKanban)
  },
  {
    path: 'kanban',
    loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule),
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
