import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <div>
      <h2>{t('notFoundTitle')}</h2>
      <p>{t('notFoundDescription')}</p>
      <Link href="/">{t('returnHome')}</Link>
    </div>
  );
}