import { Routes, RouterModule } from '@angular/router';

export const DashboardLayout_ROUTES: Routes = [
    {
        path: "",
        redirectTo:'start-view/list',
        pathMatch: "full"
    },
    {
        path: 'orders',
        loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
    },
    {
        path: 'clients',
        loadChildren: () => import('../../pages/clients/clients.module').then(m => m.ClientsModule)
    },
    {
        path: 'start-view',
        loadChildren: () => import('../../pages/start-view/start-view.module').then(m => m.StartViewModule)
    },
];