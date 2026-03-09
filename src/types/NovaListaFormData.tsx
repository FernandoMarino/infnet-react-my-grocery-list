export interface NovaListaFormData {
    nomeLista: string;
    nomeLoja?: string | undefined;
}

export type NovaListaFormErros = Partial<Record<keyof NovaListaFormData, string>>;    
