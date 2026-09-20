'use client';
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
type Language = 'en' | 'es';

const LanguageSwitcher = () => {

  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLang: Language) => {
    replace(pathname, { locale: newLang });

  }

  return (
    <div className="flex gap-2 p-1 text-primary">
      <button className='cursor-pointer'
        onClick={() => handleLanguageChange('en')}>
        <span className={`${locale === 'en' ? 'font-bold' : ''}`}>En</span>
      </button>
      <span>/</span>
      <button className='cursor-pointer'
        onClick={() => handleLanguageChange('es')}>
        <span className={`${locale === 'es' ? 'font-bold' : ''}`}>Es</span>
      </button>
    </div >
  );
};

export default LanguageSwitcher;