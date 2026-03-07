import { useEffect, useState } from "react"
import type { Loja } from "../types/Loja"

export const useLojas = () => {
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/lojas.json")
            .then(res => res.json())
            .then(data=> setLojas(data))
            .catch(err => console.error("Error loading lojas", err))
            .finally(()=>setIsLoading(false))
            
    },[])

    return {lojas, isLoading}
}