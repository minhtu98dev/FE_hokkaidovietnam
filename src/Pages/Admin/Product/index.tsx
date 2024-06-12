import { useMemo, useState } from "react";
import { useProduct, useProductSummary, useProducts } from "@/Hooks/useProduct";
import { useQuery } from "react-query";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";
import { DrawerDialog } from "../Form";

import { LuPackageSearch } from "react-icons/lu";
import { LiaBoxSolid } from "react-icons/lia";
import { getProductTypes } from "@/Apis/Product/ProductType.api";
import { DEFAULT_PRODUCT_ADD_FORM } from "../Form/constants";
import { productCreateValidationSchema } from "../Form/Components/schema.validate";

function AdminProduct() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");
    const [isVisibleAdd, setIsVisibleAdd] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);
    const [productEdit, setProductEdit] = useState<any>({})

    const {
        isLoading,
        data
    } = useProducts({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useProductSummary();

    const { add, edit, remove } = useProduct({ page, pageSize, search: debouncedValue });

    const { isLoading: isLoadingProductType, data: productType }: any = useQuery({
        queryKey: ['productType'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getProductTypes(controller.signal)
        },
        keepPreviousData: true,
        retry: 0
    });

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);

    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Số lượng sản phẩm",
                index: dataSummary?.content?.totalProduct,
                format: "sản phẩm"
            },
            {
                icon: <LiaBoxSolid />,
                label: "Loại sản phẩm",
                index: dataSummary?.content?.totalTypeProduct,
                format: "loại"
            },
        ];

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSummary]);

    const handleClickEdit = (id: any, value: any) => {
        setIsVisibleEdit(true);
        setProductEdit(value);
    }

    return (
        <div>
            <div className="flex items-center flex-wrap">
                {!isLoadingSummary && Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="lg:mt-0 mt-5 text-lg text-center uppercase lg:text-xl font-semibold">
                Sản phẩm
            </h2>

            <div className="px-0 lg:p-4 mt-4 lg:mt-8 lg:flex lg:justify-between lg:items-center">
                <div className="flex justify-between items-center lg:flex-row flex-col">
                    <PageSize
                        options={[10, 20, 50]}
                        className="mb-2 lg:mb-0 lg:mr-3 w-full"
                        defaultValue={pageSize}
                        onChange={(size: number) => {
                            setPage(1);
                            setPageSize(size)
                        }}
                    />

                    <Input
                        placeholder="Tìm kiếm"
                        value={search}
                        onChange={(event) => {
                            debouncedCallback(event.target.value);
                            setSearch(event.target.value)
                        }}
                        className="w-full lg:w-[230px] lg:mb-0 mb-2"
                    />
                </div>

                <DrawerDialog
                    label={'Tạo sản phẩm'}
                    isVisible={isVisibleAdd}
                    onHandleToogleVisible={(visible: boolean) => {
                        setIsVisibleAdd(visible)
                    }}
                    context='product'
                    defaultValues={DEFAULT_PRODUCT_ADD_FORM}
                    onHandleSubmit={(values: any) => add(values)}
                    validateSchema={productCreateValidationSchema}
                    className="lg:h-[40px] h-[26px]"
                />
            </div>

            {isLoading || isLoadingProductType ? <>
                <p>Đang tải</p>
            </> : <DataGrid
                data={data?.content}
                type={'product'}
                page={page}
                pageSize={pageSize}
                addon={productType?.data?.content}
                onHandleRemove={remove}
                onHandleEdit={handleClickEdit}
            />}

            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page)
                }}
            />

            <DrawerDialog
                label={'Sửa sản phẩm'}
                isShowButton={false}
                isVisible={isVisibleEdit}
                onHandleToogleVisible={(visible: boolean) => {
                    setIsVisibleEdit(visible)
                }}
                context='product'
                defaultValues={productEdit}
                onHandleSubmit={(values: any) => {
                    edit(productEdit.san_pham_id, values)
                }}
                validateSchema={productCreateValidationSchema}
            />
        </div >
    )
}

export default AdminProduct;