import { useEffect, useState } from "react";
import type { Loja } from "../types/Loja";

export const useLojas = () => {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/lojas.json")
      .then((res) => res.json())
      .then((data) => setLojas(data))
      .catch((err) => console.error("Error loading lojas", err))
      .finally(() => setIsLoading(false));
  }, []);

  return { lojas, isLoading };
};

export const useLoja = (nomeLoja: string) => {
  const { lojas, isLoading } = useLojas();
  
  const lojaEncontrada = isLoading ? undefined : lojas.find((loja) => loja.nome === nomeLoja);

  return { lojaEncontrada, isLoading };
};
