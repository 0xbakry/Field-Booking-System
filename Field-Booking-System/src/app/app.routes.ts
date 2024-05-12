import { Routes } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { UpdateComponent } from './Components/update/update.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { BookingComponent } from './Components/booking/booking.component';

import { HomeComponent } from './Components/home/home.component';

import { FeildsComponent } from './Components/feilds/feilds.component';
import { FeildDetailsComponent } from './Components/feild-details/feild-details.component';
import { FieldtpageComponent } from './Components/fieldtpage/fieldtpage.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"fieldtypes",component:FieldtpageComponent},
    {path:"profile",component:ProfileComponent},
    {path:"profile/update-profile", component:UpdateComponent},
    {path:"profile/favorites-fields", component:FavoritesComponent},
    {path:"profile/bookings", component:BookingComponent},
    {path:"fields",component:FeildsComponent},
    {path:"fields/:id",component:FeildDetailsComponent},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "update/:id", component: UpdateComponent},

];

