// Dynamic PDF library loader to reduce bundle size
export async function loadPDFLib() {
  const { PDFDocument, rgb } = await import('pdf-lib');
  return { PDFDocument, rgb };
}

export type PDFLibModule = Awaited<ReturnType<typeof loadPDFLib>>;
