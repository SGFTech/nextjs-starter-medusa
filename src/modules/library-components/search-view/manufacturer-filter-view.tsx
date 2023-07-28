"use client"
import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Routes } from "@lib/routes";
import { useTranslations } from "next-intl";
import Scrollbar from '../scrollbar';
import { productPlaceholder } from "../placeholders";
import { Image } from "../image"
import Spinner from "../loaders/spinner/spinner"
import Checkbox from '../ui/form-components/checkbox/checkbox';
import { ErrorMessage } from '@hookform/error-message';
import { useProducts } from 'medusa-react';

interface Props {
  manufacturers: any[];
}

const ManufacturerFilterView = ({ manufacturers }: Props) => {
  const t = useTranslations('common');
  const searchParams = useSearchParams()
  const params = useParams();
  const router = useRouter();
  const selectedValues = useMemo(
    () =>
    searchParams.get("manufacturer")??[]
        ,
    [searchParams]
  );
  const [state, setState] = useState<string[]>(selectedValues as any);
  useEffect(() => {
    setState(selectedValues as any);
  }, [selectedValues]);

  function handleChange(values: string[]) {
    const path=`/${Object.values(params).join("/")}`
    router.push(`${path}?categories=${values.join(',')}${searchParams.toString()}`)
  }

  return (
    <div className="relative -mb-5 after:absolute after:bottom-0 after:flex after:h-6 after:w-full after:bg-gradient-to-t after:from-white ltr:after:left-0 rtl:after:right-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-manufacturers')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup values={state} onChange={handleChange}>
            {manufacturers.map((plan) => (
              <Checkbox
                key={plan.id}
                label={plan.name}
                name={plan.slug}
                value={plan.slug}
                theme="secondary"
              />
            ))}
          </CheckboxGroup>
        </div>
      </Scrollbar>
    </div>
  );
};
/**
 * 
 * @returns this needs to fixed
 */
const ManufacturerFilter = () => {
  const searchParams = useSearchParams()
  const locale = searchParams.get("locale") ?? "IN"
  const { products: manufacturers, isLoading, error } = useProducts({
    q: locale,
    limit: 100,
  });
  if (error) return <ErrorMessage message={error.message} name='manufacturer filter error' />;
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <Spinner className="h-6 w-6" simple={true} />
      </div>
    );
  return <>Not available</>;
};

export default ManufacturerFilter;
