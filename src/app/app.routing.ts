import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const ROUTES: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule' }

];

export const routing = RouterModule.forRoot(ROUTES,{
    preloadingStrategy:PreloadAllModules
});