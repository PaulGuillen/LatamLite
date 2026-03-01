import "../shipmentpage.css";

interface Props {
  onSelectAll: () => void;
  onOpenExcel: () => void;
  onOpenPrint: () => void;
  onStatusClick: () => void;
}

export const ShipmentsTopBar = ({
  onSelectAll,
  onOpenExcel,
  onOpenPrint,
  onStatusClick,
}: Props) => {
  return (
    <div className="shipments-top">
      <div className="top-row">
        <button className="filter-btn">PENDIENTES ▾</button>
        <input type="text" placeholder="dd/mm/aaaa" className="date-input" />
        <input type="text" placeholder="🔍 Buscar..." className="search-input" />
      </div>

      <div className="shipments-actions">
        <button className="action-btn" onClick={onSelectAll}>
          ✔ Todo
        </button>

        <button className="action-btn" onClick={onOpenPrint}>
          🖨 Etiquetas
        </button>

        <button className="action-btn success" onClick={onOpenExcel}>
          📊 Excel
        </button>

        <button className="action-btn primary" onClick={onStatusClick}>
          ＋ Estado
        </button>

        <button className="action-btn danger">🗑</button>
      </div>
    </div>
  );
};