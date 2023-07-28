

import { useState } from "react";

import cn from "classnames";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Routes } from "@lib/routes";
import SearchBox from "./search-box";
import AutoSuggestionBox from "../search-view/suggestion";


interface Props {
    label: string;
    className?: string;
    variant?: "minimal" | "normal" | "with-shadow";
    seeMore?: boolean;
    [key: string]: unknown;
}

const SearchWithSuggestion: React.FC<Props> = (properties) => {
    const {
        label,
        className,
        seeMore = true,
        variant,
        ...props
    } = properties
    const t = useTranslations("common");
    const router = useRouter();
    const searchParams = useSearchParams()
    const params = useParams()
    const [searchTerm, updateSearchTerm] = useState("");

    const handleOnChange = (e: any) => {
        const { value: inputValue } = e.target;
        updateSearchTerm(inputValue);
    };

    const onSearch = (e: any) => {
        e.preventDefault();
        if (!searchTerm) return;
    };

    function clearSearch() {
        updateSearchTerm("");
    }

    const onSearchMore = (e: any) => {
        e.preventDefault();
        if (!searchTerm) return;
     
        router.push(`/search/${params.searchType??"products"}?${searchParams.toString()}`)
    };
    return (
        <div className={cn("relative w-full", className)}>
            <SearchBox
                label={label}
                onSubmit={onSearch}
                onClearSearch={clearSearch}
                onChange={handleOnChange}
                value={searchTerm}
                name="search"
                placeholder={t("text-search-placeholder-minimal")}
                variant={variant}
                {...props}
            />

            <AutoSuggestionBox
                searchQuery={searchTerm}
                visible={Boolean(searchTerm.length > 2)}
                seeMoreLink={onSearchMore}
                seeMore={seeMore}
            />
        </div>
    );
};

export default SearchWithSuggestion;
