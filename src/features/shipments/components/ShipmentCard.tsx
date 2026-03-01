import type { Shipment } from "../types";
import "../shipmentpage.css";

interface Props {
  shipment: Shipment;
  isSelected: boolean;
  onToggle: () => void;
}

export const ShipmentCard = ({ shipment, isSelected, onToggle }: Props) => {
  return (
    <div
      className={`shipment-card ${
        shipment.status === "ENVIADO" ? "sent-card" : ""
      }`}
    >
      <div className="shipment-left">
        <div className="shipment-checkbox">
          <input type="checkbox" checked={isSelected} onChange={onToggle} />
        </div>

        <div className="shipment-content">
          <h4>{shipment.nombre}</h4>

          <div className="shipment-meta">
            <span>📞 {shipment.telefono}</span>
            {shipment.dni && <span>🆔 {shipment.dni}</span>}
          </div>

          <div className="shipment-address">
            {shipment.origen} ➜ {shipment.destino}
          </div>
        </div>
      </div>

      <div className="shipment-right">
        <div
          className={`status ${
            shipment.status === "ENVIADO" ? "sent" : "pending"
          }`}
        >
          {shipment.status}
        </div>

        <div className="whatsapp">🟢</div>
      </div>
    </div>
  );
};
