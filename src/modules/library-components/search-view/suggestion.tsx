import dynamic from "next/dynamic";
import ErrorMessage from "../error-message";
import { useProducts } from "medusa-react"
import { useRouter, useSearchParams } from "next/navigation";

const AutoSuggestion = dynamic(() => import("./auto-suggestion"));

interface AutoSuggestionProps {
    className?: string;
    searchQuery: string;
    visible: boolean;
    seeMore: boolean;
    seeMoreLink: (e: any) => void;
}
const AutoSuggestionBox: React.FC<AutoSuggestionProps> = ({
    searchQuery,
    className,
    visible,
    seeMoreLink,
    seeMore
}) => {
    const searchParams = useSearchParams();
    const typeId = searchParams.get("type_id")
    const type_id=typeId!=null?[typeId]:undefined;
    const { isLoading, products, error } = useProducts({
        type_id: type_id,
        q: searchQuery
    });

    if (error) return <ErrorMessage message={error.message} />;
    console.log(JSON.stringify(products))
    return products ? (
        <AutoSuggestion
            suggestions={products}
            notFound={!isLoading && !products.length}
            visible={visible}
            seeMoreLink={seeMoreLink}
            seeMore={seeMore}
            className={className}
            showLoaders={isLoading && !products.length}
        />
    ) : <></>;
};

export default AutoSuggestionBox;
