import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-catfact',
    loadChildren: () => import('./create-catfact/create-catfact.module').then( m => m.CreateCatfactPageModule)
  },
  {
    path: 'list-catfacts',
    loadChildren: () => import('./list-catfacts/list-catfacts.module').then( m => m.ListCatfactsPageModule)
  },
  {
    path: 'view-single-catfact',
    loadChildren: () => import('./view-single-catfact/view-single-catfact.module').then( m => m.ViewSingleCatfactPageModule)
  },
  {
    path: 'update-catfact',
    loadChildren: () => import('./update-catfact/update-catfact.module').then( m => m.UpdateCatfactPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
