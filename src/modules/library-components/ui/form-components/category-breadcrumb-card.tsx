import { useRouter } from 'next/navigation';
import ArrowForward from '@/assets/arrow-forward.png';
import BreadcrumbButton from './breadcrumb-button';
import { Image } from './image'
import { useTranslations } from 'next-intl';

interface BreadcrumbButtonProps {
  text: string;
  image?: any;
  onClick: () => void;
}

const BreadcrumbWithIndicator: React.FC<BreadcrumbButtonProps> = ({
  text,
  image,
  onClick,
}) => (
  <>
    <span className="relative h-[32px] w-[18px] flex-shrink-0">
      <Image
        className="h-full w-full"
        src={ArrowForward}
        alt=">"
        width={18}
        height={32}
      />
    </span>
    <BreadcrumbButton text={text} image={image} onClick={onClick} />
  </>
);

interface CategoryBreadcrumbProps {
  categories: any;
}

const CategoryBreadcrumb: React.FC<CategoryBreadcrumbProps> = ({
  categories,
}) => {
  const t = useTranslations('common');
  const router = useRouter();
  const { pathname, query } = router;

  const resetCategoryClick = () => {
    const { category, ...rest } = query;
    router.push(
      {
        pathname,
        query: { ...rest },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const onCategoryClick = (slug: string) => {
    const { category, ...rest } = query;
    router.push(
      {
        pathname,
        query: { ...rest, category: slug },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  return (
    <div className="flex items-center space-x-5 rtl:space-x-reverse">
      <BreadcrumbButton
        text={t('text-all-categories')}
        onClick={resetCategoryClick}
      />

      {categories?.map((category: any) => (
        <BreadcrumbWithIndicator
          key={category?.slug}
          text={category?.name}
          image={category?.image?.original}
          onClick={() => onCategoryClick(category?.slug)}
        />
      ))}
    </div>
  );
};

export default CategoryBreadcrumb;
