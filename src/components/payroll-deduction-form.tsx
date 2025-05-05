import SignatureCanvas from 'react-signature-canvas';
import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  PayrollDeductionFormValues,
  Employee,
  PayrollDeductionFormSchema,
} from '@/schema';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  Form,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
export default function PayrollDeductionForm({
  employee,
  deductionAmount,
}: {
  employee: Employee;
  deductionAmount: number;
}) {
  const form = useForm<PayrollDeductionFormValues>({
    resolver: zodResolver(PayrollDeductionFormSchema),
    defaultValues: {
      name: `${employee.firstName} ${employee.lastName}`,
      employeeId: employee.ein,
      deptartment: '',
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      amount: deductionAmount.toString(),
      payPeriods: '',
      date2: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    },
  });

  const [pdfUrl, setPdfUrl] = useState('');
  const [signatureError, setSignatureError] = useState('');
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const handleSubmit = async (data: PayrollDeductionFormValues) => {
    // 1. Load PDF
    const arrayBuffer = await fetch('/payroll-deduction-form.pdf').then((r) =>
      r.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pdfForm = pdfDoc.getForm();

    // 2. Fill text fields
    pdfForm.getTextField('name').setText(data.name);
    pdfForm.getTextField('employeeId').setText(data.employeeId);
    pdfForm.getTextField('department').setText(data.deptartment);
    pdfForm.getTextField('date').setText(data.date);
    pdfForm.getTextField('amount').setText(data.amount);
    pdfForm.getTextField('payPeriods').setText(data.payPeriods);
    pdfForm.getTextField('date_2').setText(data.date2);

    // 3. Capture & embed signature
    if (sigCanvasRef.current?.isEmpty()) {
      console.log('Signature is empty');
      setSignatureError('Please sign the form');
      return;
    }
    const dataUrl = sigCanvasRef.current?.toDataURL();
    if (!dataUrl) return;
    const imgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imgBytes);
    pdfForm.getTextField('signature_es_:signer:signature').setImage(pngImage);

    // 4. Serialize & blobify
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled readOnly {...field} placeholder='Name' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='employeeId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee ID</FormLabel>
              <FormControl>
                <Input disabled readOnly {...field} placeholder='Employee ID' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deptartment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Department' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input disabled readOnly {...field} placeholder='Amount' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='payPeriods'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Periods</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Pay Periods'
                  type='number'
                  min={1}
                  max={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='space-y-2'>
          <Label className={signatureError ? 'text-destructive' : ''}>
            Sign here:
          </Label>
          <div
            className={`rounded-md overflow-hidden ${
              signatureError ? 'border border-destructive' : ''
            }`}
          >
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor='black'
              backgroundColor='#f0f0f0'
              canvasProps={{ width: 300, height: 100, className: 'sigCanvas' }}
            />
          </div>
          {signatureError && (
            <p className='text-destructive'>{signatureError}</p>
          )}
        </div>
        <Button
          type='button'
          onClick={() => sigCanvasRef.current?.clear()}
          variant='outline'
        >
          Clear Signature
        </Button>
        <Button type='submit'>Next</Button>
      </form>

      {pdfUrl && (
        <>
          <a href={pdfUrl} download='filled-form.pdf'>
            Download Filled PDF
          </a>
          <iframe src={pdfUrl} width='100%' height='1024x' />
        </>
      )}
    </Form>
  );
}
