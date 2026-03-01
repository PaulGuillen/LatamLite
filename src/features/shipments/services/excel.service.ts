import * as XLSX from "xlsx";
import type { Shipment } from "../types";

export const parseExcelFile = (file: File): Promise<Shipment[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: "",
        }) as any[];

        const normalized: Shipment[] = jsonData.map((row) => ({
          dni: row["DNI DESTINATARIO"],
          nombre: row["NOMBRE DESTINATARIO"],
          telefono: row["CELULAR DESTINATARIO"],
          origen: row["ORIGEN"],
          destino: row["DESTINO"],
          status: "PENDIENTE",
        }));

        resolve(normalized);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};