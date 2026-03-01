export type ShipmentStatus = "PENDIENTE" | "ENVIADO";

export interface Shipment {
  dni?: string;
  nombre: string;
  telefono: string;
  origen?: string;
  destino?: string;
  status: ShipmentStatus;
}