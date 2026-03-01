import type { Shipment } from "../types";
import { ShipmentCard } from "./ShipmentCard";

interface Props {
  shipments: Shipment[];
  selectedRows: number[];
  onToggleRow: (index: number) => void;
}

export const ShipmentsList = ({
  shipments,
  selectedRows,
  onToggleRow,
}: Props) => {
  return (
    <div className="shipments-container">
      <div className="shipments-header">
        <h3>SHALOM</h3>
        <span className="small-badge">{shipments.length} envíos</span>
      </div>

      {shipments.map((item, index) => (
        <ShipmentCard
          key={index}
          shipment={item}
          isSelected={selectedRows.includes(index)}
          onToggle={() => onToggleRow(index)}
        />
      ))}
    </div>
  );
};