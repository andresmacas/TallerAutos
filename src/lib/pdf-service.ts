// lib/pdf-service.ts
import chromium from '@sparticuz/chromium-min';
import puppeteerCore from 'puppeteer-core';
import puppeteer from 'puppeteer';

// Ruta del ejecutable remoto de Chromium para Vercel
const remoteExecutablePath = 'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar';

let browserInstance: any;

async function getBrowser() {
  if (browserInstance) return browserInstance;

  if (process.env.VERCEL_ENV === 'production') {
    // Configuración para producción en Vercel
    browserInstance = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: chromium.headless,
    });
  } else {
    // Configuración para desarrollo local
    browserInstance = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });
  }

  return browserInstance;
}

export async function generatePDFFromHTML(html: string) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Añadir meta tag para viewport consistente
    const htmlWithViewport = html.replace(
      '<head>',
      '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    );

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

// Forzar estilos consistentes
await page.addStyleTag({
  content: `
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    body {
      font-size: 12pt !important;
      font-family: Arial, sans-serif !important;
    }
  `
});

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      scale: 1
    },
  );

    return pdf;
  } finally {
    await page.close();
    // Nota: No cerramos el navegador aquí para reutilizarlo en futuras solicitudes
    // En un entorno serverless como Vercel, el contenedor se destruirá después de la ejecución
  }
}