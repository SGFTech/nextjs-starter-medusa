"use client"
import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';
//import Checkbox from '@/components/ui/forms/checkbox/checkbox';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Scrollbar from '../scrollbar';
import Checkbox from '../ui/form-components/checkbox/checkbox';
import ErrorMessage from '../error-message';
import Spinner from '../loaders/spinner/spinner';
import { useProductCategories as useCategories } from 'medusa-react';
//import Scrollbar from '@/components/ui/scrollbar';
//import { useTranslation } from 'next-i18next';
//import { useCategories } from '@/framework/category';
//import ErrorMessage from '@/components/ui/error-message';
//import Spinner from '@/components/ui/loaders/spinner/spinner';

interface Props {
  categories: any[];
}

const CategoryFilterView = ({ categories }: Props) => {
  const t = useTranslations('common');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const selectedValues = useMemo(
    () =>
    category ? (category as string).split(',') : [],
    [category]
  );
  const [state, setState] = useState<string[]>(() => selectedValues);
  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(values: string[]) {
    const path=`/${Object.values(params).join("/")}`
    router.push(`${path}?categories=${values.join(',')}${searchParams.toString()}`)
  }

  return (
    <div className="relative -mb-5 after:absolute after:bottom-0 after:flex after:h-6 after:w-full after:bg-gradient-to-t after:from-white ltr:after:left-0 rtl:after:right-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-categories')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup values={state} onChange={handleChange}>
            {categories.map((plan) => (
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

const CategoryFilter: React.FC<{ type?: any }> = ({ type }) => {
  const params = useParams();
  const searchParams = useSearchParams()
  const limit = searchParams.get("limit");

  // @ts-ignore
  const { product_categories: categories, isLoading, error } = useCategories({
    ...(type ? { type } : { type: searchParams.get("searchType") }),
    limit: limit?parseInt(limit):1000
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <Spinner className="h-6 w-6" simple={true} />
      </div>
    );
  return categories ? <CategoryFilterView categories={categories} /> : <></>;
};

export default CategoryFilter;
