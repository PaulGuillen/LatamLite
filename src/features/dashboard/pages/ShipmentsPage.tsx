import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/shipmentpage.css";

interface Shipment {
  dni?: string;
  nombre: string;
  telefono: string;
  origen?: string;
  destino?: string;
}

export const ShipmentsPage = () => {
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [printFormat, setPrintFormat] = useState<"1col" | "2col" | null>(null);

  /* ============================
      DESCARGAR FORMATO
  ============================ */

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/Formato.xlsx";
    link.download = "Formato.xlsx";
    link.click();
  };

  /* ============================
      SUBIDA MASIVA
  ============================ */

  const handleUploadExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      }) as any[];

      const REQUIRED_COLUMNS = [
        "DNI DESTINATARIO",
        "NOMBRE DESTINATARIO",
        "CELULAR DESTINATARIO",
        "ORIGEN",
        "DESTINO",
      ];

      const firstRowKeys = Object.keys(jsonData[0] || {});

      const missing = REQUIRED_COLUMNS.filter(
        (col) => !firstRowKeys.includes(col),
      );

      if (missing.length > 0) {
        alert(`Faltan columnas obligatorias: ${missing.join(", ")}`);
        return;
      }

      const normalized: Shipment[] = jsonData.map((row) => ({
        dni: row["DNI DESTINATARIO"],
        nombre: row["NOMBRE DESTINATARIO"],
        telefono: row["CELULAR DESTINATARIO"],
        origen: row["ORIGEN"],
        destino: row["DESTINO"],
      }));

      setShipments(normalized);
      setSelectedRows([]);
      setSelectAll(false);
      setShowExcelModal(false);
    };

    reader.readAsArrayBuffer(file);
  };

  /* ============================
      SELECT ALL
  ============================ */

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIndexes = shipments.map((_, index) => index);
      setSelectedRows(allIndexes);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  /* ============================
      IMPRESIÓN REAL
  ============================ */

  const handlePrintLabels = () => {
    if (!printFormat) return;

    const selectedShipments =
      selectedRows.length > 0
        ? shipments.filter((_, i) => selectedRows.includes(i))
        : shipments;

    if (selectedShipments.length === 0) {
      alert("No hay envíos para imprimir");
      return;
    }

    const printWindow = window.open("", "", "width=1000,height=800");
    if (!printWindow) return;

    // 🔥 EXACTAMENTE 5 POR HOJA
    const perPage = 5;

    const pages = [];
    for (let i = 0; i < selectedShipments.length; i += perPage) {
      pages.push(selectedShipments.slice(i, i + perPage));
    }

    printWindow.document.write(`
    <html>
      <head>
        <title>Etiquetas</title>
        <style>
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            font-family: Arial, sans-serif;
            margin: 0;
          }

          .page {
            page-break-after: always;
          }

          .label {
            border: 1px solid #000;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 18px;
            height: 180px;
            box-sizing: border-box;
          }

          .header {
            display:flex;
            justify-content:space-between;
            font-size:12px;
            margin-bottom:10px;
          }

          .name {
            font-size:20px;
            font-weight:bold;
          }

          .phone {
            font-size:14px;
            margin-bottom:10px;
          }

          .destino {
            font-size:13px;
            margin-top:8px;
          }

          .footer {
            display:flex;
            justify-content:space-between;
            margin-top:10px;
            font-weight:bold;
          }
        </style>
      </head>
      <body>

        ${pages
          .map(
            (group) => `
              <div class="page">
                ${group
                  .map(
                    (item) => `
                      <div class="label">
                        <div class="header">
                          <span>REMITENTE</span>
                          <span>Veceff.es</span>
                        </div>

                        <div>PARA:</div>
                        <div class="name">${item.nombre}</div>
                        <div class="phone">${item.telefono}</div>

                        <div class="destino">
                          <strong>AGENCIA:</strong> ${item.origen || ""} / ${
                            item.destino || ""
                          } <br/>
                          <strong>DNI:</strong> ${item.dni || "-"}
                        </div>

                        <div class="footer">
                          <span>SHALOM</span>
                          <span>${new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            `,
          )
          .join("")}

      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  /* ============================
      UI
  ============================ */

  useEffect(() => {
    if (showExcelModal || showPrintModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowExcelModal(false);
        setShowPrintModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showExcelModal, showPrintModal]);

  return (
    <div className="shipments-wrapper">
      <div className="shipments-top">
        <div className="top-row">
          <button className="filter-btn">PENDIENTES ▾</button>
          <input type="text" placeholder="dd/mm/aaaa" className="date-input" />
          <input
            type="text"
            placeholder="🔍 Buscar..."
            className="search-input"
          />
        </div>

        <div className="shipments-actions">
          <button className="action-btn" onClick={handleSelectAll}>
            ✔ Todo
          </button>

          <button
            className="action-btn"
            onClick={() => setShowPrintModal(true)}
          >
            🖨 Etiquetas
          </button>

          <button
            className="action-btn success"
            onClick={() => setShowExcelModal(true)}
          >
            📊 Excel
          </button>

          <button className="action-btn primary">＋ Estado</button>
          <button className="action-btn danger">🗑</button>
        </div>
      </div>

      <div className="shipments-container">
        <div className="shipments-header">
          <h3>SHALOM</h3>
          <span className="small-badge">{shipments.length} envíos</span>
        </div>

        {shipments.map((item, index) => (
          <div key={index} className="shipment-card">
            <div className="shipment-left">
              <div className="shipment-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleSelectRow(index)}
                />
              </div>

              <div className="shipment-content">
                <h4>{item.nombre}</h4>
                <div className="shipment-meta">
                  <span>📞 {item.telefono}</span>
                  {item.dni && <span>🆔 {item.dni}</span>}
                </div>

                <div className="shipment-address">
                  {item.origen} ➜ {item.destino}
                </div>
              </div>
            </div>

            <div className="shipment-right">
              <div className="status pending">PENDIENTE</div>
              <div className="whatsapp">🟢</div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EXCEL */}
      {showExcelModal && (
        <div
          className="export-overlay"
          onClick={() => setShowExcelModal(false)}
        >
          <div className="export-modal" onClick={(e) => e.stopPropagation()}>
            <div className="export-header">
              <div className="export-title">
                <span style={{ color: "#22c55e", fontSize: "18px" }}>📄</span>
                <h3>Exportar Pedidos</h3>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowExcelModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="export-subtitle">
              Hemos detectado los siguientes couriers en tu lista filtrada. ¿Qué
              formato deseas descargar?
            </p>

            {/* OPCIÓN 1 */}
            <div className="export-option" onClick={handleDownloadTemplate}>
              <div className="export-left">
                <div className="export-badge">SH</div>
                <div>
                  <h4>Formato Shalom</h4>
                  <small>
                    {shipments.length} envíos listos para carga masiva
                  </small>
                </div>
              </div>

              <div className="export-action">⬇</div>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #1e293b",
                margin: "14px 0",
              }}
            />

            {/* OPCIÓN 2 */}
            {/* OPCIÓN 2 – SUBIDA MASIVA */}
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
                style={{ display: "none" }}
                onChange={handleUploadExcel}
              />
            </label>
          </div>
        </div>
      )}

      {/* MODAL IMPRESIÓN */}
      {showPrintModal && (
        <div
          className="export-overlay"
          onClick={() => setShowPrintModal(false)}
        >
          <div className="export-modal" onClick={(e) => e.stopPropagation()}>
            <div className="export-header">
              <div className="export-title">
                <span>🖨</span>
                <h3>Formato de Impresión</h3>
              </div>
              <button
                className="close-btn"
                onClick={() => setShowPrintModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="export-subtitle">
              Selecciona cómo deseas organizar las etiquetas.
            </p>

            <div className="print-options">
              <div
                className={`print-card ${printFormat === "1col" ? "active" : ""}`}
                onClick={() => setPrintFormat("1col")}
              >
                <div className="print-preview one"></div>
                <span>1 Columna</span>
              </div>

              <div
                className={`print-card ${printFormat === "2col" ? "active" : ""}`}
                onClick={() => setPrintFormat("2col")}
              >
                <div className="print-preview two"></div>
                <span>2 Columnas</span>
              </div>
            </div>

            <div className="print-actions">
              <button
                className="action-btn"
                onClick={() => setShowPrintModal(false)}
              >
                Cancelar
              </button>

              <button
                className="action-btn primary"
                disabled={!printFormat}
                onClick={() => {
                  handlePrintLabels();
                  setShowPrintModal(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
