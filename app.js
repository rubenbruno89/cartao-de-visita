import feather from "feather-icons";
import QRCode from "qrcode";

/* ...existing code... */
const PHONE_RAW = "+5527999208451";
const WHATS_URL = "https://api.whatsapp.com/send?phone=5527999208451";
const EMAIL = "rubenbruno@outlook.com";
/* ...existing code... */

// Render icons
feather.replace({ width: 18, height: 18, "stroke-width": 2 });

// Copy handlers
document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.getAttribute("data-copy"));
      toast("Copiado!");
    } catch {
      toast("Não foi possível copiar");
    }
  });
});

/* vCard generation */
document.getElementById("saveContactBtn")?.addEventListener("click", () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Rúben;Menezes;;;",
    "FN:Rúben Menezes",
    "TITLE:Analista de Suporte Técnico",
    `TEL;TYPE=CELL,VOICE:${PHONE_RAW}`,
    `EMAIL;TYPE=INTERNET:${EMAIL}`,
    `ITEM1.URL:${WHATS_URL}`,
    "ITEM1.X-ABLabel:WhatsApp",
    "END:VCARD"
  ].join("\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Ruben-Menezes.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  toast("Contato baixado");
});

/* QR Code dialog */
const qrBtn = document.getElementById("qrBtn");
const qrDialog = document.getElementById("qrDialog");
const qrClose = document.getElementById("qrClose");
const qrCanvas = document.getElementById("qrCanvas");

function openQR() {
  if (!qrDialog.open) qrDialog.showModal();
  QRCode.toCanvas(qrCanvas, WHATS_URL, { width: 256, margin: 2 }, err => {
    if (err) console.error(err);
  });
}
function closeQR() { if (qrDialog.open) qrDialog.close(); }

qrBtn?.addEventListener("click", openQR);
qrClose?.addEventListener("click", closeQR);
qrDialog?.addEventListener("click", (e) => { if (e.target === qrDialog) closeQR(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQR(); });

/* Toast utility */
const toastEl = document.getElementById("toast");
let toastTimer;
function toast(message = "") {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

