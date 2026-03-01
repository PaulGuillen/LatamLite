import type { ShipmentStatus } from "../types";
import "../shipmentpage.css";

interface Props {
  selectedCount: number;
  allSent: boolean;
  onClose: () => void;
  onUpdate: (status: ShipmentStatus) => void;
}

export const StatusModal = ({
  selectedCount,
  allSent,
  onClose,
  onUpdate,
}: Props) => {
  return (
    <div className="export-overlay" onClick={onClose}>
      <div
        className="status-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Actualizar Estado</h2>
        <p>Se aplicará a {selectedCount} elemento(s).</p>

        <button
          className={allSent ? "btn-pendiente" : "btn-enviado"}
          onClick={() => {
            onUpdate(allSent ? "PENDIENTE" : "ENVIADO");
            onClose();
          }}
        >
          {allSent
            ? "⏳ MARCAR COMO PENDIENTE"
            : "🚚 MARCAR COMO ENVIADO"}
        </button>
      </div>
    </div>
  );
};