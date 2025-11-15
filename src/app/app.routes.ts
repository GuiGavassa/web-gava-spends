import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarteiraComponent } from './pages/carteira/carteira.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carteira', component: CarteiraComponent },
  { path: 'transacoes', component: TransacoesComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: '**', redirectTo: '' }
];