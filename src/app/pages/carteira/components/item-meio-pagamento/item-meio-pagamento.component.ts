import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;
  saldo?: number;
  cor?: string;
}

@Component({
  selector: 'app-item-meio-pagamento',
  imports: [CommonModule],
  templateUrl: './item-meio-pagamento.component.html',
  styleUrl: './item-meio-pagamento.component.scss'
})
export class ItemMeioPagamentoComponent {
  @Input() item!: MeioPagamento;
  @Output() editar = new EventEmitter<MeioPagamento>();
  @Output() remover = new EventEmitter<number>();

  onEditar() {
    this.editar.emit(this.item);
  }

  onRemover() {
    this.remover.emit(this.item.id);
  }

  get corPadrao(): string {
    return this.item.tipo === 'credito' ? '#3498db' : '#27ae60';
  }

  get tipoLabel(): string {
    if (this.item.tipo === 'credito') return 'Crédito';
    if (this.item.tipo === 'debito') return 'Débito';
    return 'Conta Corrente';
  }

  get valorLabel(): string {
    if (this.item.tipo === 'credito') {
      return `Limite: R$ ${this.item.limite?.toFixed(2) || '0.00'}`;
    }
    return `Saldo: R$ ${this.item.saldo?.toFixed(2) || '0.00'}`;
  }
}
