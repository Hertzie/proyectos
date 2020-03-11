import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'proyecto/:id',
    loadChildren: () => import('./proyecto/proyecto.module').then( m => m.ProyectoPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'actividades',
    loadChildren: () => import('./actividades/actividades.module').then( m => m.ActividadesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
