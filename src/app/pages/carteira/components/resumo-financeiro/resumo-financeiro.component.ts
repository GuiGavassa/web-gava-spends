import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumo-financeiro',
  imports: [CommonModule],
  templateUrl: './resumo-financeiro.component.html',
  styleUrl: './resumo-financeiro.component.scss'
})
export class ResumoFinanceiroComponent {
  @Input() totalLimiteCredito: number = 0;
  @Input() totalSaldoContas: number = 0;
}
