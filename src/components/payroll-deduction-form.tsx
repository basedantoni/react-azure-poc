import SignatureCanvas from 'react-signature-canvas';
import { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import {
  PayrollDeductionFormValues,
  PayrollDeductionFormSchema,
} from '@/schema';
import { useFormStepper } from '@/hooks/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function PayrollDeductionForm() {
  const { user, payrollDeductionAmount, incrementCurrentStep } =
    useFormStepper();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const form = useForm<PayrollDeductionFormValues>({
    resolver: zodResolver(PayrollDeductionFormSchema),
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      employeeId: user?.ein.toString() ?? '',
      deptartment: '',
      company: '',
      date: new Date().toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
      amount: `${payrollDeductionAmount}`,
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
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

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
    pdfForm.getRadioGroup('company').select(data.company);
    pdfForm.getTextField('amount').setText(data.amount);
    pdfForm.getTextField('payPeriods').setText(data.payPeriods);
    pdfForm.getTextField('date2').setText(data.date2);

    // 3. Capture & embed signature
    if (sigCanvasRef.current?.isEmpty()) {
      console.log('Signature is empty');
      setSignatureError('Please sign the form');
      return;
    }

    setSignatureError('');
    const dataUrl = sigCanvasRef.current?.toDataURL();
    if (!dataUrl) return;
    const imgBytes = await fetch(dataUrl).then((r) => r.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imgBytes);
    pdfForm.getTextField('signature').setImage(pngImage);

    // 4. Serialize & blobify
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);

    // Timeout to allow the PDF to load
    setTimeout(() => {
      if (confirmButtonRef.current) {
        confirmButtonRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='pb-4 space-y-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input readOnly {...field} placeholder='Name' />
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
                  <Input readOnly {...field} placeholder='Employee ID' />
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
                <FormLabel required>Department</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Department' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Company</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className='flex gap-2'>
                      <FormControl>
                        <RadioGroupItem value='zachryConstruction' />
                      </FormControl>
                      <FormLabel>Zachry Construction</FormLabel>
                    </FormItem>
                    <FormItem className='flex gap-2'>
                      <FormControl>
                        <RadioGroupItem value='zachryHotel' />
                      </FormControl>
                      <FormLabel>Zachry Hotels</FormLabel>
                    </FormItem>
                    <FormItem className='flex gap-2'>
                      <FormControl>
                        <RadioGroupItem value='zuus' />
                      </FormControl>
                      <FormLabel>Zuus</FormLabel>
                    </FormItem>
                    <FormItem className='flex gap-2'>
                      <FormControl>
                        <RadioGroupItem value='capitalAggregates' />
                      </FormControl>
                      <FormLabel>Capitol Aggregates</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
                  <Input readOnly {...field} placeholder='Amount' />
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
                <FormLabel required>Pay Periods</FormLabel>
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
            <Label
              required
              className={signatureError ? 'text-destructive' : ''}
            >
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
            <Button
              type='button'
              onClick={() => sigCanvasRef.current?.clear()}
              variant='outline'
            >
              Clear Signature
            </Button>
            <Button type='submit'>Next</Button>
          </div>
        </form>

        {pdfUrl && (
          <div className='space-y-4'>
            <p className='text-lg font-bold'>Preview</p>
            {isMobile ? (
              <div className='flex flex-col items-center gap-4 p-4 border rounded-lg'>
                <p className='text-center text-muted-foreground'>
                  PDF preview is not available on mobile devices. Please
                  download the PDF to view it.
                </p>
                <Button
                  variant='secondary'
                  asChild
                  className='w-full sm:w-auto'
                >
                  <a href={pdfUrl} download='filled-form.pdf'>
                    Download PDF
                  </a>
                </Button>
              </div>
            ) : (
              <iframe
                className='w-full h-[50vh] sm:h-[70vh] md:h-[80vh]'
                src={pdfUrl}
              />
            )}
            <div className='flex justify-end gap-2'>
              <Button variant='secondary' asChild>
                <a href={pdfUrl} download='filled-form.pdf'>
                  Download Filled PDF
                </a>
              </Button>
              <Button
                ref={confirmButtonRef}
                onClick={() => incrementCurrentStep()}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
