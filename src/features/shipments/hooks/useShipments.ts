import { useEffect, useState } from "react";
import { parseExcelFile } from "../services/excel.service";
import type { Shipment, ShipmentStatus } from "../types";

export const useShipments = () => {
  /* =========================
     UI STATE
  ========================= */

  const [showExcelModal, setShowExcelModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [printFormat, setPrintFormat] = useState<"1col" | "2col" | null>(null);

  /* =========================
     DATA STATE
  ========================= */

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  /* =========================
     DESCARGAR FORMATO
  ========================= */

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/Formato.xlsx";
    link.download = "Formato.xlsx";
    link.click();
  };

  /* =========================
     SUBIDA EXCEL
  ========================= */

  const handleUploadExcel = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const parsed = await parseExcelFile(file);

      setShipments(parsed);
      setSelectedRows([]);
      setSelectAll(false);
      setShowExcelModal(false);
    } catch (error) {
      alert("Error procesando el archivo Excel" + (error instanceof Error ? error.message : ""));
    }
  };

  /* =========================
     SELECT ALL
  ========================= */

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

  /* =========================
     STATUS ACTION
  ========================= */

  const handleStatusClick = () => {
    if (selectedRows.length === 0) {
      setShowToast(true);
      return;
    }

    setShowStatusModal(true);
  };

  const updateStatus = (newStatus: ShipmentStatus) => {
    const updated = shipments.map((item, index) =>
      selectedRows.includes(index)
        ? { ...item, status: newStatus }
        : item
    );

    setShipments(updated);
    setShowStatusModal(false);
  };


  const selectedShipments = shipments.filter((_, i) =>
    selectedRows.includes(i)
  );

  const allSent =
    selectedShipments.length > 0 &&
    selectedShipments.every((s) => s.status === "ENVIADO");

  /* =========================
     IMPRESIÓN
  ========================= */

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
    const perPage = printFormat === "1col" ? 5 : 10;

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
            display: grid;
            grid-template-columns: ${printFormat === "2col" ? "1fr 1fr" : "1fr"};
            gap: 12px;
          }

          .label {
            border: 1px solid #000;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 12px;
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
                          <strong>AGENCIA:</strong> ${item.origen || ""} / ${item.destino || ""
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


  /* =========================
     ESC & SCROLL LOCK
  ========================= */

  useEffect(() => {
    if (showExcelModal || showPrintModal || showStatusModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowExcelModal(false);
        setShowPrintModal(false);
        setShowStatusModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showExcelModal, showPrintModal, showStatusModal]);

  /* =========================
     RETURN (ViewModel API)
  ========================= */

  return {
    // data
    shipments,
    selectedRows,
    selectAll,
    printFormat,

    // ui flags
    showExcelModal,
    showPrintModal,
    showStatusModal,
    showToast,
    allSent,
    // setters UI
    setShowExcelModal,
    setShowPrintModal,
    setShowStatusModal,
    setPrintFormat,

    // logic
    setShipments,
    handleDownloadTemplate,
    handleUploadExcel,
    handleSelectAll,
    handleSelectRow,
    handleStatusClick,
    updateStatus,
    handlePrintLabels,
  };
};