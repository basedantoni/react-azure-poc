import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className='w-[100px]'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='en'>English</SelectItem>
        <SelectItem value='es'>Español</SelectItem>
      </SelectContent>
    </Select>
  );
}
