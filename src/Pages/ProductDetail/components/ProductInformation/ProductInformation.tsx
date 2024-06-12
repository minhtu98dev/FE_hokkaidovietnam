import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCartStorage } from "@/Hooks/useCartStorage";
import useWindowDimensions from "@/Hooks/useWindowDimension";
import { useMutation } from "react-query";
import { useAuth } from "@/Auth/AuthProvider";

import { Divider } from "@/Components/Divider"
import Quantity from "@/Components/Quantity/Quantity"
import { Button } from "@/Components/ui/button"

import { HandleAddCart, formatCurrency } from "@/Helper/helper"
import { actions } from "@/Redux/actions/cart.action";

import { Product } from "@/Types/Product.type";
import { toast } from "react-toastify";
import { addtoCart } from "@/Apis/Cart/Cart.api";

import "./styles.scss"

const DEFAULT_QUANTITY = 1;

interface ProductAddTypeName extends Product {
    ten_loai_san_pham: string;
}

const ProductInformation: React.FC<ProductAddTypeName> = (props: ProductAddTypeName) => {
    const {
        ten_san_pham,
        trang_thai_san_pham,
        gia_ban,
        mo_ta,
        so_luong_trong_kho,
        ten_loai_san_pham
    } = props;

    const { saveCartStorage } = useCartStorage();
    const { isLogin } = useAuth();
    const dispatch: any = useDispatch();
    const { width } = useWindowDimensions();
    const [quantityState, setQuantityState] = useState<number>(DEFAULT_QUANTITY);

    const addProductMutation = useMutation({
        mutationFn: (body: any) => addtoCart(body),
        onSuccess: (_) => {
            setQuantityState(DEFAULT_QUANTITY)
        },
    });

    const onMutateCartSuccess = (payload: any) => {
        const resolveCart = HandleAddCart(payload)

        // * convert JSON string để lưu xuống local storage
        saveCartStorage(resolveCart);

        // * Thao tác với state cart trong reducer
        dispatch(actions.setCart(resolveCart));

        toast.success("Thêm giỏ hàng thành công", {
            position: "bottom-center"
        })
    }

    const handleAddCart = () => {
        const payload = {
            ...props,
            so_luong: quantityState
        };

        if (isLogin) {
            let newPayload: any = {
                san_pham_id: payload.san_pham_id,
                so_luong: quantityState
            };

            addProductMutation.mutate(newPayload);
        }

        onMutateCartSuccess(payload);
    };

    const handleQuantityChanged = (quantity: number) => {
        setQuantityState(quantity);
    }

    return <div><div className="text-black">
        <h3 className="
        text-center
        md:text-left
        text-2xl
        md:text-3xl
        lg:text-4xl
        font-light"
        >{ten_san_pham}
        </h3>

        <p className="text-center md:hidden block mt-4 font-normal text-3xl">{formatCurrency(gia_ban)}</p>

        <div className="text-center
        md:text-left mt-5">
            <span className="font-light text-base text-[#777171]">
                Thương hiệu:
                <span className="font-medium text-black ml-1">{ten_loai_san_pham}</span>
            </span>
            <span className="mx-2">|</span>

            <span className="font-light text-base text-[#777171]">
                Tình trạng:
                <span className="font-medium text-black ml-1">{trang_thai_san_pham ? "Còn hàng" : "Hết hàng"}</span>
            </span>
        </div>

        <p className="hidden md:block mt-8 font-normal md:text-3xl  lg:text-4xl">{formatCurrency(gia_ban)}</p>

        <p className="font-light text-secondary text-base mt-5">
            {mo_ta}
        </p>

        <Divider className="my-6" />


        <div className="my-6 flex lg:flex-row flex-col">
            <div className="mr-1" style={{
                width: width < 992 ? "w-full" : ""
            }}>
                <Quantity
                    defaultValue={1}
                    hasPreventByLimit
                    limit={so_luong_trong_kho}
                    onChanged={handleQuantityChanged}
                    fullWidth={width < 992}
                />
            </div>

            <div className="ml-0 mt-4 lg:mt-0 lg:ml-1 flex-1">
                <Button
                    size={'cart'}
                    variant={'cart-btn'}
                    onClick={handleAddCart}
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>


        <p className="text-center lg:text-left text-base font-light text-[#777171]">Gọi đặt mua: <span className="font-medium text-black">0904 229 229</span> để nhanh chóng đặt hàng</p>
    </div>
    </div>
}

export default ProductInformation