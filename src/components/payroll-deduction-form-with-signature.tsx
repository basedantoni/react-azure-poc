import SignatureCanvas from 'react-signature-canvas';
import { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useFormStepper } from '@/hooks/form';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function PayrollDeductionForm() {
  const { user, payrollDeductionAmount, incrementCurrentStep } =
    useFormStepper();

  const [pdfUrl, setPdfUrl] = useState('/payroll-deduction-form.pdf');
  const [nextStep, setNextStep] = useState(false);
  const [signatureError, setSignatureError] = useState('');
  const [formError, setFormError] = useState('');

  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      // 1. Load PDF
      const arrayBuffer = await fetch(pdfUrl).then((r) => r.arrayBuffer());
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pdfForm = pdfDoc.getForm();

      // 2. Fill text fields
      pdfForm.getTextField('name').setText(user?.firstName);
      pdfForm.getTextField('employeeId').setText(user?.ein.toString());
      pdfForm.getTextField('department').setText(user?.jobNumber);
      pdfForm.getTextField('amount').setText(payrollDeductionAmount.toString());

      // 4. Serialize & blobify
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };

    loadPdf();

    if (confirmButtonRef.current) {
      confirmButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleConfirm = async () => {
    // Load PDF
    const arrayBuffer = await fetch(pdfUrl).then((r) => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pdfForm = pdfDoc.getForm();

    console.log(pdfForm.getRadioGroup('company').getSelected());

    if (sigCanvasRef.current?.isEmpty()) {
      setSignatureError('Please sign the form');
    } else if (pdfForm.getRadioGroup('company').getSelected() === null) {
      setFormError('Please select a company');
    } else {
      // Embed signature
      const dataUrl = sigCanvasRef.current?.toDataURL();
      if (!dataUrl) return;
      const imgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
      const pngImage = await pdfDoc.embedPng(imgBytes);
      pdfForm.getTextField('signature').setImage(pngImage);

      // Serialize & blobify
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      setNextStep(true);
    }
  };

  const handleReset = () => {
    sigCanvasRef.current?.clear();
    setSignatureError('');
    setFormError('');
    setNextStep(false);
  };

  return (
    <div className='pb-4 space-y-4'>
      <div className='space-y-4'>
        <p className='text-lg font-bold'>Preview</p>
        {pdfUrl && (
          <iframe className='w-full h-[600px] sm:h-[875px]' src={pdfUrl} />
        )}
        {formError && <p className='text-destructive'>{formError}</p>}
        <div className='space-y-2'>
          <Label required className={signatureError ? 'text-destructive' : ''}>
            Sign here:
          </Label>
          <div
            className={`rounded-md overflow-hidden ${
              signatureError ? 'border border-destructive w-full' : ''
            }`}
          >
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor='black'
              backgroundColor='#f0f0f0'
              canvasProps={{
                className: 'sigCanvas w-full h-24',
              }}
            />
          </div>
          {signatureError && (
            <p className='text-destructive'>{signatureError}</p>
          )}
        </div>
        <div className='flex justify-end gap-2'>
          <Button type='button' onClick={handleReset} variant='outline'>
            Clear Signature
          </Button>
          {nextStep ? (
            <Button onClick={() => incrementCurrentStep()}>Next</Button>
          ) : (
            <Button ref={confirmButtonRef} onClick={handleConfirm}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
