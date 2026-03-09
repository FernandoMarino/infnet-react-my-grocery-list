export interface NovaListaFormData {
    nomeLista: string;
    nomeLoja?: string;
}

export type NovaListaFormErros = Partial<Record<keyof NovaListaFormData, string>>;    
