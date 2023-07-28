
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Slider from "../ui/form-components/range-slider"

const defaultPriceRange = [0, 1000];
const PriceFilter = () => {
  const t = useTranslations('common');
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter();
  const price = searchParams.get("price")
  const selectedValues = useMemo(
    () =>
        price
        ? (price as string).split(',')
        : defaultPriceRange,
    [price]
  );
  const [state, setState] = useState<number[] | string[]>(selectedValues);

  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(value: number[]) {
    setState(value);
    const path=`/${Object.values(params).join("/")}`
    router.push(`${path}?price=${value.join(',')}${searchParams.toString()}`)
    /*router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        price: value.join(','),
      },
    });*/
  }

  return (
    <>
      <span className="sr-only">{t('text-sort-by-price')}</span>
      <Slider
        allowCross={false}
        range
        min={0}
        max={2000}
        //@ts-ignore
        defaultValue={state}
        //@ts-ignore
        value={state}
        onChange={(value: any) => handleChange(value)}
      />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex flex-col items-start p-2 bg-gray-100 border border-gray-200 rounded">
          <label className="text-sm font-semibold text-gray-400">Min</label>
          <span className="text-sm font-bold text-heading">{state[0]}</span>
        </div>
        <div className="flex flex-col p-2 bg-gray-100 border border-gray-200 rounded">
          <label className="text-sm font-semibold text-gray-400">Max</label>
          <span className="text-sm font-bold text-heading">{state[1]}</span>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
