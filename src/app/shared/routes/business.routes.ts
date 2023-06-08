import { Routes } from '@angular/router';
import { BusinessComponent } from 'src/app/pages/business/business.component';

export const Business_ROUTES: Routes = [
    {
        path: '',
        component: BusinessComponent,
        data: {
            title: 'Negocios'
        }
    }
];