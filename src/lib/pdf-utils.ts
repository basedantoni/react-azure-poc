// Dynamic PDF library loader to reduce bundle size
// This ensures pdf-lib is only loaded when actually needed for PDF generation
export async function loadPDFLib() {
  try {
    const { PDFDocument, rgb } = await import('pdf-lib');
    return { PDFDocument, rgb };
  } catch (error) {
    console.error('Failed to load PDF library:', error);
    throw new Error('PDF library failed to load. Please try again.');
  }
}

export type PDFLibModule = Awaited<ReturnType<typeof loadPDFLib>>;

// Helper function to create a PDF blob URL with cleanup
export function createPDFBlobUrl(pdfBytes: Uint8Array): {
  url: string;
  cleanup: () => void;
} {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  return {
    url,
    cleanup: () => URL.revokeObjectURL(url),
  };
}
