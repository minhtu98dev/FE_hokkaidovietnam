import { useMemo, useState } from "react";
import useDebouncedCallback from "@/Hooks/useDebounceCallback";
import {
    useContact,
    useContactList,
    useContactSummary
} from "@/Hooks/useContact";

import DataGrid from "@/Components/DataGrid/Datagrid";
import MetricCard from "@/Components/Metrics/MetricCard";
import { HPagination } from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import PageSize from "@/Components/PageSize";

import { LuPackageSearch } from "react-icons/lu";
// import { LiaBoxSolid } from "react-icons/lia";

function AdminContact() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const {
        isLoading,
        data
    } = useContactList({ page, pageSize, search: debouncedValue });
    const { isLoading: isLoadingSummary, data: dataSummary } = useContactSummary();

    const { remove, editStatus } = useContact({ page, pageSize, search: debouncedValue });


    const Metrics = useMemo(() => {
        return [
            {
                icon: <LuPackageSearch />,
                label: "Tổng số liên hệ",
                index: dataSummary?.content?.totalContact,
                format: "liên hệ"
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSummary]);

    const handleChangeDebounced = (value: string) => {
        setPage(1);
        setDebouncedValue(value);
    };

    const [debouncedCallback] = useDebouncedCallback(handleChangeDebounced, 500, [search]);


    const handleChangeStatusContact = (id: any, status: any) => {
        editStatus({
            id, status
        })
    }

    return (
        <div>
            <div className="flex items-center flex-wrap">
                {!isLoadingSummary && Metrics.map((metric, index) => {
                    return <MetricCard {...metric} key={index} />
                })}
            </div>

            <h2 className="lg:mt-0 mt-5 text-lg text-center uppercase lg:text-xl font-semibold">
                Liên hệ
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
                        className="w-full lg:w-[230px]"
                    />
                </div>
            </div>

            {
                isLoading ? <>
                    <p>Đang tải</p>
                </> : <DataGrid
                    data={data?.content}
                    type={'contact'}
                    page={page}
                    pageSize={pageSize}
                    onHandleRemove={remove}
                    onChangeStatus={handleChangeStatusContact}
                />
            }

            <HPagination
                total={data?.total || 0}
                pageSize={pageSize}
                current={page}
                onChangePage={(page: number) => {
                    setPage(page)
                }}
            />
        </div >
    )
}

export default AdminContact;