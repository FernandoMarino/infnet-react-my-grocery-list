export interface NovoItemFormProps {
  listaId: string;
  onAdd: (listaId: string, nome: string, qtd: number) => void;
}
