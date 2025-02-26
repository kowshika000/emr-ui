import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const BarcodePrint = ({ value, details, onPrintComplete }) => {
  const barcodeRef = useRef(null);
  const printRef = useRef(null);

  useEffect(() => {
    if (value) {
   
      barcodeRef.current.innerHTML = "";

   
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true,
      });

      setTimeout(() => {
        handlePrint();
      }, 500);
    }
  }, [value]);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <title>Print Barcode</title>
          <style>
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            .barcode-container { display: flex; flex-direction: column; align-items: center; }
            .details { text-align: center; font-family: Arial, sans-serif; font-size: 12px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);

    if (onPrintComplete) {
      onPrintComplete();
    }
  };

  return (
    <div ref={printRef} className="" style={{ display: "none" }}>
      <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
      <svg ref={barcodeRef}></svg>
      <div className="details">
        {details && details.length > 0 ? (
          details.map((line, index) => <p key={index}>{line}</p>)
        ) : (
          <p>No details available</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default BarcodePrint;
