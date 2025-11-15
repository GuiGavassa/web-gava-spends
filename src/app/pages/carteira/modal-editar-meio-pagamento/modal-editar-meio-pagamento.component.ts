import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MeioPagamento {
  id: number;
  nome: string;
  tipo: 'credito' | 'debito' | 'conta';
  limite?: number;
  saldo?: number;
  cor?: string;
}

@Component({
  selector: 'app-modal-editar-meio-pagamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-editar-meio-pagamento.component.html',
  styleUrls: ['./modal-editar-meio-pagamento.component.scss']
})
export class ModalEditarMeioPagamentoComponent {
  @Input() aberto = false;
  @Input() item: MeioPagamento | null = null;
  @Input() tipo: 'credito' | 'debito' = 'credito';
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<MeioPagamento>();

  itemEditavel: MeioPagamento | null = null;
  
  // Cores predefinidas
  coresPredefinidas = [
    { nome: 'Azul', valor: '#3498db' },
    { nome: 'Verde', valor: '#27ae60' },
    { nome: 'Roxo', valor: '#9b59b6' },
    { nome: 'Laranja', valor: '#e67e22' }
  ];
  
  corSelecionada = '#3498db';
  mostrarSeletorCor = false;

  ngOnChanges() {
    if (this.item) {
      this.itemEditavel = { ...this.item };
      this.corSelecionada = this.item.cor || '#3498db';
      this.mostrarSeletorCor = false;
    }
  }

  fecharModal() {
    this.fechar.emit();
  }

  salvarEdicao() {
    if (this.itemEditavel) {
      this.salvar.emit({ ...this.itemEditavel });
    }
  }

  selecionarCor(cor: string) {
    this.corSelecionada = cor;
    if (this.itemEditavel) {
      this.itemEditavel.cor = cor;
    }
    this.mostrarSeletorCor = false;
  }

  abrirSeletorCor() {
    this.mostrarSeletorCor = true;
  }

  atualizarCorCustomizada(event: any) {
    this.corSelecionada = event.target.value;
    if (this.itemEditavel) {
      this.itemEditavel.cor = event.target.value;
    }
  }
}
