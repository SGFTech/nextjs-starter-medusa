"use-client"


import { RadioGroup } from '@headlessui/react';
import { useIsRTL } from '@lib/locals';
import { useTranslations } from 'next-intl';
import { ReadonlyURLSearchParams, useParams, useRouter,useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSearchParam } from 'react-use';
import Scrollbar from '../scrollbar';
import Select from '../select/select';


interface Plan {
  id: number | string;
  key: string;
  label: string;
  value: string;
  orderBy: string;
  sortedBy: 'ASC' | 'DESC';
}
const plans: Plan[] = [
  {
    id: '1',
    key: 'sorting',
    label: 'New Released',
    value: 'created_at',
    orderBy: 'created_at',
    sortedBy: 'DESC',
  },
  {
    id: '2',
    key: 'sorting',
    label: 'Sort by Price: Low to High',
    value: 'min_price',
    orderBy: 'min_price',
    sortedBy: 'ASC',
  },
  {
    id: '3',
    key: 'sorting',
    label: 'Sort by Price: High to Low',
    value: 'max_price',
    orderBy: 'max_price',
    sortedBy: 'DESC',
  },
];

type Props = {
  variant?: 'radio' | 'dropdown';
  searchParams:ReadonlyURLSearchParams;

};

const Sorting: React.FC<Props> = ({ variant = 'radio',searchParams }) => {
  const params = useParams();
  const router = useRouter();
  const orderBy = searchParams.get("orderBy")
  const  t = useTranslations('common');
  const { isRTL } = useIsRTL();
  const [selected, setSelected] = useState(
    () =>
      plans.find((plan) => plan.orderBy === orderBy) ?? plans[0]
  );

  useEffect(() => {
    if (!orderBy) {
      setSelected(plans[0]);
    }
  }, [orderBy]);

  function handleChange(values: Plan) {
    const { orderBy, sortedBy } = values;
    const path = params.searchType??"/";
    router.push(`${path}?${searchParams.toString()}`)
    setSelected(values);
  }

  return (
    <>
      {variant === 'dropdown' && (
        <Select
          defaultValue={selected}
          isRtl={isRTL}
          options={plans}
          isSearchable={false}
          // @ts-ignore
          onChange={handleChange}
        />
      )}
      {variant === 'radio' && (
        <Scrollbar style={{ maxHeight: '400px' }}>
          <RadioGroup value={selected} onChange={handleChange}>
            <RadioGroup.Label className="sr-only">
              {t('text-sort')}
            </RadioGroup.Label>
            <div className="space-y-4">
              {plans.map((plan) => (
                <RadioGroup.Option key={plan.id} value={plan}>
                  {({ checked }) => (
                    <>
                      <div className="flex w-full cursor-pointer items-center">
                        <span
                          className={`h-[18px] w-[18px] rounded-full bg-white ltr:mr-3 rtl:ml-3 ${checked
                              ? 'border-[5px] border-gray-800'
                              : 'border border-gray-600'
                            }`}
                        />
                        <RadioGroup.Label as="p" className="text-sm text-body">
                          {plan.label}
                        </RadioGroup.Label>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </Scrollbar>
      )}
    </>
  );
};

export default Sorting;
