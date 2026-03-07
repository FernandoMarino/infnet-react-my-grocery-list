export interface NovaListaFormData {
    nomeLista: string;
    nomeLoja?: string;
}

export type NovaListaFormErros = {
    [key in keyof Partial<NovaListaFormData>]: string
    
}