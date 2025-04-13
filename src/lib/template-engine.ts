import fs from 'fs'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderTemplate(templateName: string, data: any): string {
  const templatePath = path.join(process.cwd(), 'src', 'lib', 'templates', `${templateName}.html`);
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Asegurar encoding UTF-8
  html = html.replace('<head>', '<head><meta charset="UTF-8">');

  // Reemplazo simple de variables
  html = html.replace(/\{\{(\w+)(\.\w+)*\}\}/g, (match) => {
    const props = match.slice(2, -2).split('.');
    return props.reduce((obj: any, key: string) => obj?.[key], data) || '';
  });

  // Soporte para condicionales básicos
  html = html.replace(/\{\{if (.*?)\}\}(.*?)\{\{\/if\}\}/gs, (match, condition, content) => {
    const [varName, value] = condition.split('===').map(s => s.trim());
    return data[varName] === value ? content : '';
  });

  // Función mejorada para generar el HTML del checkbox
  const generateCheckbox = (checked: boolean) =>
    `<span style="
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 1px solid #000;
      margin-right: 6px;
      vertical-align: middle;
    ">
      ${checked ? 
        `<svg width="12" height="12" viewBox="0 0 12 12" style="margin: 1px;">
          <path d="M1 6.5L4 9.5L11 2.5" stroke="black" stroke-width="2" fill="none"/>
        </svg>` : 
        ''
      }
    </span>`;

  // Reemplaza todos los checkboxes
  Object.keys(data.elementosIngreso).forEach(key => {
    const pattern = new RegExp(`<!-- CHECKBOX:${key} -->`, 'g');
    html = html.replace(pattern, generateCheckbox(data.elementosIngreso[key]));
  });

  return html;
}