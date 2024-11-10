import { Routes } from '@angular/router';
import { AddProductPageComponent } from './page/add-product-page/add-product-page.component';
import { ManageProductPageComponent } from './page/manage-product-page/manage-product-page.component';
import { DashbordComponent } from './page/dashbord/dashbord.component';
import { RegisterPageComponent } from './page/register-page/register-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ManageOrderPageComponent } from './page/manage-order-page/manage-order-page.component';

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
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "register",
        component: RegisterPageComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "manage-order",
        component: ManageOrderPageComponent
    }
];
