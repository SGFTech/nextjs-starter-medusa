import { useTranslations } from "next-intl";


interface Props {
  from: number;
  to: number;
  total: number;
}

const SearchCount = ({ from, to, total }: Props) => {
  const t = useTranslations('common');

  return (
    <span className="text-sm font-semibold text-heading">{`${t(
      'text-showing'
    )} ${from} - ${to} ${t('text-of')} ${total} ${t('text-products')}`}</span>
  );
};

export default SearchCount;
