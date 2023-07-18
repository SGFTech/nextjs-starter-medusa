
import cn from 'classnames';
import Link from './link';
import { Image } from "./image"
import { siteSettings } from  "@lib/site"


const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-32 w-256 overflow-hidden md:w-40">
        <Image
          src={siteSettings.logo.url}
          alt={siteSettings.logo.alt || 'SourceGoodFood'}
          fill
          sizes="(max-width: 768px) 1000vw"
          loading="eager"
          className="object-contain"
        />
      </span>
    </Link>
  );
};

export default Logo;
