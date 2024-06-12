import * as React from "react"
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/Components/ui/button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";

// ! Form Handler
import FormProduct from "./Components/FormProduct"
// import FormContact from "./Components/FormContact"
import FormOrderFilter from "./Components/FormOrderFilter";
import FormOrderDetail from "./Components/FormOrderDetail";
import { FormCustomerDetail } from "./Components/FormCustomerDetail";
import { ScrollArea } from "@/Components/ui/scroll-area";

interface IProps {
    isVisible: boolean;
    onHandleToogleVisible?: Function;
    label?: string;
    drawerTriggerEle?: any;
    context: string;
    onHandleSubmit?: any;
    defaultValues?: any;
    validateSchema?: any;
    isShowButton?: boolean;
    className?: string
}

export function DrawerDialog(props: IProps) {
    const {
        isVisible = false,
        onHandleToogleVisible,
        label = 'Open Drawer',
        drawerTriggerEle,
        onHandleSubmit,
        context,
        defaultValues,
        validateSchema,
        isShowButton = true,
        className = ""
    }: any = props;

    const [open, setOpen] = React.useState(isVisible);

    React.useEffect(() => {
        setOpen(isVisible)
    }, [isVisible])



    const {
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        ...formProps
    } = useForm<any>({
        mode: "onChange",
        defaultValues,
        ...(validateSchema && { resolver: yupResolver(validateSchema), })
    });

    useEffect(() => {
        reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues]);

    const errorsMgs: any = errors;

    const renderForm: any = {
        'product': <FormProduct {...formProps} errorsMgs={errorsMgs} reset={reset} />,
        'orderFilter': <FormOrderFilter {...formProps} reset={reset} />,
        "orderDetail": <FormOrderDetail id={defaultValues} reset={reset} />,
        "customerDetail": <FormCustomerDetail id={defaultValues} reset={reset} />,
    }

    const handleToogleVisible = (isOpen: boolean) => {
        onHandleToogleVisible && onHandleToogleVisible(isOpen);

        setOpen(isOpen);
    }


    const handleOnSubmitForm = async (values: any) => {
        let dataBuild = { ...values };

        if (context === 'product') {
            dataBuild = {
                gia_ban: parseInt(dataBuild.gia_ban),
                gia_giam: parseInt(dataBuild.gia_giam),
                hinh_anh: dataBuild.hinh_anh,
                loai_san_pham_id: dataBuild.loai_san_pham_id,
                mo_ta: dataBuild.mo_ta,
                so_luong_trong_kho: dataBuild.so_luong_trong_kho,
                thong_tin_chi_tiet: dataBuild.thong_tin_chi_tiet,
                ten_san_pham: dataBuild.ten_san_pham
            }
        }

        onHandleSubmit && onHandleSubmit(dataBuild)

        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onOpenChange={handleToogleVisible}
            direction="right"
        >
            {isShowButton && <DrawerTrigger asChild>
                {
                    drawerTriggerEle ?
                        drawerTriggerEle : <Button className={className}>
                            {label}
                        </Button>
                }
            </DrawerTrigger>}


            <DrawerContent className="h-[100vh] w-[100vw] lg:w-[40vw]" >
                <DrawerHeader className="w-[100%] flex justify-between text-left" style={{
                    height: "76px"
                }}>
                    <div>
                        <DrawerTitle>{label}</DrawerTitle>

                        <DrawerDescription>
                            Bạn đang {label} mới
                        </DrawerDescription>

                    </div>

                    <DrawerClose asChild className="lg:hidden block h-[40px] w-[40px]">
                        <Button>X</Button>
                    </DrawerClose>
                </DrawerHeader>

                <ScrollArea
                    style={{
                        height: `calc(100vh - 80px - 76px)`
                    }}
                >
                    <form onSubmit={handleSubmit((values) => handleOnSubmitForm(values))}>
                        {renderForm[context]}
                    </form>
                </ScrollArea>

                <DrawerFooter className="lg:flex hidden pt-2 w-full" style={{
                    height: "80px"
                }}>
                    <DrawerClose asChild>
                        <Button variant="outline">Đóng</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}