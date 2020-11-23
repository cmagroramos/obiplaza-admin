export interface Pedido {
    $key:      string;
    cliente:   Cliente;
    cobrado:   boolean;
    fecha:     Date;
    pedido:    Detalle[];
    preparado: boolean;
    total: number;
    tipo:      string;
}

export interface Cliente {
    address?:     string;
    number?:      string;
    city?:        string;
    email:       string;
    firstName:   string;
    phoneNumber: string;
    mesa?: number;
    comensales?: number;
    obs: string;
}

export interface Detalle {
    description: string;
    name:        string;
    options:     Option[];
    picture:     string;
    price:       number;
    quantity:    number;
    size:        string;
}

export interface Option {
    name:  string;
    value: number;
}

export interface Opciones {
    key: string;
    label: string;
  }

