import { Routes } from '@angular/router';
import { AddProductPageComponent } from './page/add-product-page/add-product-page.component';
import { ManageProductPageComponent } from './page/manage-product-page/manage-product-page.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';

export const routes: Routes = [
    {
        path: "add-product",
        component: AddProductPageComponent
    },
    {
        path: "manage-product",
        component: ManageProductPageComponent
    },
    {
        path: "",
        component: DashbordComponent
    }
];
