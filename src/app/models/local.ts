export interface Local {
    address: string;
    desc: string;
    urlRedir: string;
    email: string;
    facebookPage?: string;
    instagramPage?: string;
    logo: string;
    map?: string;
    officeLocation: string;
    phoneNumber: string;
    pinterestPage?: string;
    storeName: string;
    twitterPage: string;
    horario: Horarios[];
    horarioEntregas: Horarios[];
    pedidos: Pedidos[];
    welcomeImages?: string[];
    welcomeButtonText: string;
    parametroCorreo: string;
    loteria: Loteria;
}

export interface Horarios {
    dia: string;
    abierto: boolean;
    desdeManana: string;
    hastaManana: string;
    desdeTarde: string;
    hastaTarde: string;
}

export interface Pedidos {
    activo: boolean;
    titulo: string;
    subtitulo: string;
    icon: string;
    url: string;
    pedidoMinimo?: number;
    gastosEnvio?: number;
}

export interface Map {
    annotations: Annotation[];
    origin:      Origin;
    zoomLevel:   number;
}

export interface Annotation {
    latitude:  number;
    longitude: number;
    title:     string;
}

export interface Origin {
    latitude:  number;
    longitude: number;
}

export interface Loteria {
    activo: boolean;
    numero: number;
    precio: number;
}
