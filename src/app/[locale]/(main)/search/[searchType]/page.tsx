
"use client"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import StickyBox from "react-sticky-box";

import dynamic from "next/dynamic";
import { useProducts } from "medusa-react";
import { useTranslations } from "next-intl";
import { useAtom } from "jotai";
import { PRODUCTS_PER_PAGE } from "@lib/constants";
import { drawerAtom } from "@lib/store/drawer-atom";
import SearchCount from "@modules/library-components/search-view/search-count";
import Sorting from "@modules/library-components/search-view/sorting";
import {Grid} from "@modules/products/components/grid";
import ErrorMessage from "@modules/library-components/error-message";
import SidebarFilter from "@modules/library-components/search-view/sidebar-filter";
import { ReactChildren, ReactElement } from "react";





export default function SearchPage({ params,searchParams }: 
    { params: { searchType: string },searchParams:ReadonlyURLSearchParams }) {
    
    searchParams = useSearchParams()
    const sortDirection = searchParams.get('sortBy')
    const { searchType, ...restQuery }: any = searchParams;
    const {
        products,
        isLoading,
        error,
        limit,
        offset,
        count,
        refetch:loadMore,
        isFetching:isLoadingMore,
    } = useProducts({
        limit: PRODUCTS_PER_PAGE,
        order: `${sortDirection?.toLowerCase()=="desc"?"-":""}${searchParams?.get('order')??"title"}`,
        
        ...(searchParams?.get('category') && { categories: searchParams?.get('category') }),
        ...(searchType && { type: searchType }),
        ...restQuery
    });
    const hasMore = (count??0) > (offset??0)+(limit??1)

    if (error) return <ErrorMessage message={error.message} />;
    return (
        <SearchTemplate>
        <div className="w-full">
            <div className="mb-7 flex flex-col items-center justify-between md:flex-row">
                {/* //FIXME: */}
                <SearchCount
                    from={(offset??0)}
                    to={(offset??0)+(limit??1)}
                    total={(count??0)}
                />
                <div className="mt-4 max-w-xs md:mt-0">
                    <Sorting variant="dropdown" searchParams={searchParams} />
                </div>
            </div>
            <Grid
                // TODO: Fix types
                products={products as any}
                loadMore={loadMore}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                error={error}
                column="five"
            />
        </div>
        </SearchTemplate>
    );
}

const SearchTemplate :React.FC<{children:ReactElement}> = ({children}) => {
    const  t  = useTranslations("common");
    // eslint-disable-next-line no-unused-vars
    const [_, setDrawerView] = useAtom(drawerAtom);
    return (
        
            <>
                <div className="w-full bg-light">
                    <div className="mx-auto flex min-h-screen w-full max-w-1920 px-5 py-10 rtl:space-x-reverse lg:space-x-10 xl:py-14 xl:px-16">
                        <div className="hidden w-80 shrink-0 lg:block">
                            <StickyBox offsetTop={140} offsetBottom={30}>
                                <SidebarFilter />
                            </StickyBox>
                        </div>
                        {children}
                    </div>
                </div>
            </>
        
    );
};


