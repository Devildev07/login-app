import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './pages/users/userTabs/clients/clients.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'resetpassword',
    loadChildren: () =>
      import('./pages/resetpassword/resetpassword.module').then(
        (m) => m.ResetpasswordPageModule
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then((m) => m.LandingPageModule),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('./pages/videos/videos.module').then((m) => m.VideosPageModule),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./pages/devices/devices.module').then((m) => m.DevicesPageModule),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('./pages/playlist/playlist.module').then(
        (m) => m.PlaylistPageModule
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category/category.module').then(
        (m) => m.CategoryPageModule
      ),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./pages/locations/locations.module').then(
        (m) => m.LocationsPageModule
      ),
  },
  {
    path: 'campaign',
    loadChildren: () =>
      import('./pages/campaign/campaign.module').then(
        (m) => m.CampaignPageModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./pages/inventory/inventory.module').then(
        (m) => m.InventoryPageModule
      ),
  },
  {
    path: 'invoice',
    loadChildren: () =>
      import('./pages/invoice/invoice.module').then((m) => m.InvoicePageModule),
  },
  {
    path: 'certificates',
    loadChildren: () =>
      import('./pages/certificates/certificates.module').then(
        (m) => m.CertificatesPageModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'add-admin',
    loadChildren: () =>
      import('./pages/addData/add-admin/add-admin.module').then(
        (m) => m.AddAdminPageModule
      ),
  },
  {
    path: 'add-advertiser',
    loadChildren: () =>
      import('./pages/addData/add-advertiser/add-advertiser.module').then(
        (m) => m.AddAdvertiserPageModule
      ),
  },
  {
    path: 'add-agency',
    loadChildren: () =>
      import('./pages/addData/add-agency/add-agency.module').then(
        (m) => m.AddAgencyPageModule
      ),
  },
  {
    path: 'add-clients',
    loadChildren: () =>
      import('./pages/addData/add-clients/add-clients.module').then(
        (m) => m.AddClientsPageModule
      ),
  },
  {
    path: 'add-manager',
    loadChildren: () =>
      import('./pages/addData/add-manager/add-manager.module').then(
        (m) => m.AddManagerPageModule
      ),
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./pages/modal/modal.module').then((m) => m.ModalPageModule),
  },  {
    path: 'add-videos',
    loadChildren: () => import('./pages/addData/add-videos/add-videos.module').then( m => m.AddVideosPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./pages/addData/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'modal-category',
    loadChildren: () => import('./pages/modal-category/modal-category.module').then( m => m.ModalCategoryPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
