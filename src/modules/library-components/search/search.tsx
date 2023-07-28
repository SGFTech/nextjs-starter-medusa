
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useSearch } from "./search.context";
import { useTranslations } from "next-intl";
import SearchBox from "./search-box";
interface Props {
    label: string;
    variant?: "minimal" | "normal" | "with-shadow" | "flat";
    [key: string]: unknown;
}

const Search: React.FC<Props> = ({ label, variant, ...props }) => {
    const  t  = useTranslations("common");
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { searchTerm, updateSearchTerm } = useSearch();
    const handleOnChange = (e: any) => {
        const { value } = e.target;
        updateSearchTerm(value);
    };

    const onSearch = (e: any) => {
        e.preventDefault();
        if (!searchTerm) return;
        router.push(`${params.searchType}/search?${searchParams.toString()}`
            
        );
    };

    function clearSearch() {
        updateSearchTerm("");
        
        
        const params = useParams();
        const searchParams = useSearchParams();
        const text = searchParams.get("q")
        if (text) {
            router.push(`/${params.searchType}/search?${searchParams.toString()}`
            )
        }
    }

    return (
        <SearchBox
            label={label}
            onSubmit={onSearch}
            onClearSearch={clearSearch}
            onChange={handleOnChange}
            value={searchTerm}
            name="search"
            placeholder={t("text-search-placeholder")}
            variant={variant}
            {...props}
        />
    );
};

export default Search;
