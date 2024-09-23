import { Routes } from '@angular/router';
import { CardComponent } from './pages/addresses/card/card.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:'address-card/:id',
        component: CardComponent
    },
    {
        path:'**',
        redirectTo:''
    }
];
