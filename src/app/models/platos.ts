export interface Platos {
    $key: string;
    body:             string;
    category:         string;
    extraOptions?:    ExtraOption[];
    isFeatured:       boolean;
    pictures?:         string[];
    price:            Price[];
    standardOptions?: StandardOption[];
    tags:             string[];
    thumb:            string;
    title:            string;
    alergenos?:       string[];
    activo:           boolean;
    orden:            number;
    ordenRecomendacion?: number;
    compraOnline:     boolean;
    opcionesExcluyentes: boolean;
    opcionesExtrasExcluyentes: boolean;
}


export interface ExtraOption {
    name:     string;
    selected: boolean;
    value:    number;
}

export interface Price {
    currency: string;
    name:     string;
    value:    string;
}

export interface StandardOption {
    name:     string;
    selected: boolean;
    value?:    number;
}
