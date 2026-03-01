import "../shipmentpage.css";

interface Props {
  printFormat: "1col" | "2col" | null;
  setPrintFormat: (format: "1col" | "2col") => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const PrintModal = ({
  printFormat,
  setPrintFormat,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <div className="export-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="export-header">
          <div className="export-title">
            <span style={{ fontSize: "18px" }}>🖨</span>
            <h3>Formato de Impresión</h3>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* SUBTITLE */}
        <p className="export-subtitle">
          Selecciona cómo deseas organizar las etiquetas.
        </p>

        {/* OPTIONS */}
        <div className="print-options">
          <div
            className={`print-card ${
              printFormat === "1col" ? "active" : ""
            }`}
            onClick={() => setPrintFormat("1col")}
          >
            <div className="print-preview one"></div>
            <span>1 Columna</span>
          </div>

          <div
            className={`print-card ${
              printFormat === "2col" ? "active" : ""
            }`}
            onClick={() => setPrintFormat("2col")}
          >
            <div className="print-preview two"></div>
            <span>2 Columnas</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="print-actions">
          <button
            className="action-btn"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="action-btn primary"
            disabled={!printFormat}
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
};