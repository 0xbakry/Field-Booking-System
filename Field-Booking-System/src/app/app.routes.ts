import { Routes } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { UpdateComponent } from './Components/update/update.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { BookingComponent } from './Components/booking/booking.component';

export const routes: Routes = [
    {path:"profile",component:ProfileComponent},
    {path:"profile/update-profile", component:UpdateComponent},
    {path:"profile/favorites-fields", component:FavoritesComponent},
    {path:"profile/bookings", component:BookingComponent}
];
