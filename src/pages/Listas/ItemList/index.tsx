import type { Item } from "../../../types/Item";
import { ItemListButton, ItemListStyled } from "../../../styles/pages/Listas/itemList";


interface ItemListProps {
  listaId: string;
  items: Item[];
  onDelete: (listaId: string, itemId: string) => void;
}

export default function ItemList({ listaId, items, onDelete }: ItemListProps) {
  return (
    <ItemListStyled>
      {items.map((item) => (
        <li key={item.id}>
          {item.nome} — {item.qtd}
          <ItemListButton
            color="danger"
            size="sm"
            onClick={() => onDelete(listaId, item.id)}
            
          >
            Remover
          </ItemListButton>
        </li>
      ))}
    </ItemListStyled>
  );
}