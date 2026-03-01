import "../shipmentpage.css";

interface Props {
  shipmentsCount: number;
  onClose: () => void;
  onDownload: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExcelModal = ({
  shipmentsCount,
  onClose,
  onDownload,
  onUpload,
}: Props) => {
  return (
    <div className="export-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="export-header">
          <div className="export-title">
            <span style={{ color: "#22c55e", fontSize: "18px" }}>📄</span>
            <h3>Exportar Pedidos</h3>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* SUBTITLE */}
        <p className="export-subtitle">
          Hemos detectado los siguientes couriers en tu lista filtrada.
          ¿Qué formato deseas descargar?
        </p>

        {/* OPCIÓN 1 */}
        <div className="export-option" onClick={onDownload}>
          <div className="export-left">
            <div className="export-badge">SH</div>

            <div>
              <h4>Formato Shalom</h4>
              <small>
                {shipmentsCount} envíos listos para carga masiva
              </small>
            </div>
          </div>

          <div className="export-action">⬇</div>
        </div>

        {/* DIVISOR */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #1e293b",
            margin: "14px 0",
          }}
        />

        {/* OPCIÓN 2 */}
        <label className="export-option">
          <div className="export-left">
            <div className="export-badge green">UP</div>

            <div>
              <h4>Subida Masiva</h4>
              <small>Cargar Excel con estructura válida</small>
            </div>
          </div>

          <div className="export-action">📤</div>

          <input
            type="file"
            accept=".xlsx,.xls"
            hidden
            onChange={onUpload}
          />
        </label>

      </div>
    </div>
  );
};