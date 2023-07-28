import CheckboxGroup from './checkbox-group';
import { useState, useEffect, useMemo } from 'react';
import { useProductTags, useProductTags as useTags } from 'medusa-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';
import { ErrorMessage } from '@hookform/error-message';


import Checkbox from '../ui/form-components/checkbox/checkbox';
import Scrollbar from '../scrollbar';
import { ProductTag } from '@medusajs/medusa';
import Spinner from '../loaders/spinner/spinner';




interface Props {
  tags?: ProductTag[];
}

const TagFilterView = ({ tags }: Props) => {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const getTagParams = searchParams.get("tags")
  const productTags = useProductTags({
    value:getTagParams??""
  })
  tags = tags??productTags.product_tags
  const selectedValues = useMemo(
    () => tags ? (tags.map(t=>t.value)):[],
    [tags]
  );
  const [state, setState] = useState<string[]>(selectedValues);
  useEffect(() => {
    setState(selectedValues);
  }, [selectedValues]);

  function handleChange(values: string[]) {
    const path=`/${Object.values(params).join("/")}`
    router.push(`${path}?tags=${values.join(',')}${searchParams.toString()}`)
    /*router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        tags: values.join(','),
      },
    });*/
  }

  return (
    <div className="relative -mb-5 after:absolute after:bottom-0 after:flex after:h-6 after:w-full after:bg-gradient-to-t after:from-white ltr:after:left-0 rtl:after:right-0">
      <Scrollbar style={{ maxHeight: '400px' }} className="pb-6">
        <span className="sr-only">{t('text-tags')}</span>
        <div className="grid grid-cols-1 gap-4">
          <CheckboxGroup values={state} onChange={handleChange}>
            {tags?.map((plan) => (
              <Checkbox
                key={plan.id}
                label={plan.value}
                name={plan.value}
                value={plan.value}
                theme="secondary"
              />
            ))}
          </CheckboxGroup>
        </div>
      </Scrollbar>
    </div>
  );
};

const TagFilter = () => {
  const { product_tags: tags, isLoading, error } = useTags({ limit: 100 });
  let err: any = error;
  if (err) return <ErrorMessage message={err?.message} name='Tag-Error' />;
  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-5">
        <Spinner className="h-6 w-6" simple={true} />
      </div>
    );

  return tags ? <TagFilterView tags={tags} /> : <></>;
};

export default TagFilter;
