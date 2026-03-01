import { ShipmentsTopBar } from "../components/ShipmentsTopBar";
import { StatusModal } from "../components/StatusModal";
import { ExcelModal } from "../components/ExcelModal";
import { PrintModal } from "../components/PrintModal";
import { Toast } from "../components/Toast";
import { useShipments } from "../hooks/useShipments";
import { ShipmentsList } from "../components/ShipmentsList";
import "../shipmentpage.css";

export const ShipmentPage = () => {
  const vm = useShipments();

  return (
    <div className="shipments-wrapper">
      {vm.showToast && <Toast message="Selecciona al menos un envío" />}

      {vm.showStatusModal && (
        <StatusModal
          selectedCount={vm.selectedRows.length}
          allSent={vm.allSent}
          onClose={() => vm.setShowStatusModal(false)}
          onUpdate={vm.updateStatus}
        />
      )}

      <ShipmentsTopBar
        onSelectAll={vm.handleSelectAll}
        onOpenExcel={() => vm.setShowExcelModal(true)}
        onOpenPrint={() => vm.setShowPrintModal(true)}
        onStatusClick={vm.handleStatusClick}
      />

      <ShipmentsList
        shipments={vm.shipments}
        selectedRows={vm.selectedRows}
        onToggleRow={vm.handleSelectRow}
      />

      {vm.showExcelModal && (
        <ExcelModal
          shipmentsCount={vm.shipments.length}
          onClose={() => vm.setShowExcelModal(false)}
          onDownload={vm.handleDownloadTemplate}
          onUpload={vm.handleUploadExcel}
        />
      )}

      {vm.showPrintModal && (
        <PrintModal
          printFormat={vm.printFormat}
          setPrintFormat={vm.setPrintFormat}
          onClose={() => vm.setShowPrintModal(false)}
          onConfirm={vm.handlePrintLabels}
        />
      )}
    </div>
  );
};
