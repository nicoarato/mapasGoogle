export interface PuntoVenta {
    'type': 'Feature';
    'properties': {
        'red': string;
        'subagente': number;
        'permiso': number;
        'titular': string;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'promedio_ventas_3mes': string;
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'estado_comercial': string;
    };
    'geometry': {
        'type': string;
        'coordinates': number[];
    };
}
