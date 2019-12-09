import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { MainPageComponent } from './main-page/main-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'help',
    component: HelpPageComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
