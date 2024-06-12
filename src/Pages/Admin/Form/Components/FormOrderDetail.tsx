import { useAddress } from '@/Hooks/useAddress/useAddress';
import { useQuery } from 'react-query';

import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { Skeleton } from '@/Components/ui/skeleton';

import { badgeTagStatusTransform, formatCurrency, formatTime, isEmpty, paymentTransform, summaryPriceInCart } from '@/Helper/helper';
import { getOrderDetail } from '@/Apis/Order/Order.api';
import { STATUS_ORDER } from '@/Components/DataGrid/columns';

function FormOrderDetail(props: any) {
    const { id } = props;
    const { buildAddressFromId } = useAddress();

    const { isLoading, data }: any = useQuery({
        queryKey: ['order_detail', id],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getOrderDetail(id)
        },
        keepPreviousData: true,
        retry: 0
    });

    const SkeletonTemplate = () => {
        return <div>
            <Skeleton className="h-4 w-full" />
        </div>
    }

    const order: any = data?.data?.content || {};

    const products = order?.ChiTietDonHang?.map(((product: any) => {
        return {
            so_luong: product.so_luong,
            gia_ban: product.don_gia
        }
    })) || [];

    const calculateSummary = summaryPriceInCart(products || []);

    return (
        <div className='mx-3 my-2'>
            <h4>Thông tin chi tiết người nhận</h4>

            {isLoading ? SkeletonTemplate() :
                isEmpty(order) ? <p className='my-6 flex justify-center'>Đơn hàng không còn tồn tại</p> :

                    <div className='my-4'>
                        <div className='grid grid-cols-2 mb-2'>
                            <div>
                                <Label>Trạng thái đơn hàng</Label>
                                <div>
                                    <p>{<Badge
                                        variant={badgeTagStatusTransform(order.trang_thai_don_hang_id, 'trang_thai_don_hang_id')}>
                                        {STATUS_ORDER?.find((y: any) => y.value === order?.trang_thai_don_hang_id)?.label || ""}</Badge>}</p>
                                </div>
                            </div>

                            <div>
                                <Label>Ngày đặt hàng</Label>
                                <p>{formatTime(order.thoi_gian_dat_hang, "dd/mm/yyyy hh:mm")}</p>
                            </div>

                        </div>

                        <div className='grid grid-cols-2 mb-2'>
                            <div>
                                <Label>Phương thức thanh toán</Label>
                                <p>{<Badge>{paymentTransform(order.hinh_thuc_thanh_toan_id)}</Badge>}</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-2'>
                            <div>
                                <Label>Khách hàng</Label>
                                <p>{order.ho_ten}</p>
                            </div>

                            <div>
                                <Label>Liên hệ</Label>
                                <p>{order.so_dien_thoai}</p>
                                <p>{order.email}</p>
                            </div>
                        </div>

                        <div>
                            <Label>Địa chỉ đầy đủ</Label>

                            <p>{buildAddressFromId({
                                dia_chi: order.dia_chi,
                                phuong_id: order.phuong_id,
                                quan_id: order.quan_id,
                                tinh_thanh_id: order.tinh_thanh_id,
                            })}</p>
                        </div>

                        <h4 className='my-4 font-semibold'>Sản phẩm trong đơn</h4>

                        <div className='my-4'>
                            {order.ChiTietDonHang.map((product: any, idx: any) => {
                                return <>
                                    <div key={idx} className='grid my-2 flex items-center  grid-cols-4'>
                                        <div className="col-span-3 flex items-center ">
                                            <div className='mr-4'>
                                                <img
                                                    src={product.SanPham.hinh_anh[0]}
                                                    style={{
                                                        height: "auto"
                                                    }}
                                                    alt="hinh_anh san pham"
                                                    className='lg:max-w-[40px] max-w-[20px]'
                                                />
                                            </div>

                                            <div className='text-sm lg:text-base'>{product.SanPham.ten_san_pham}</div>
                                        </div>

                                        <div className="col-span-1 lg:flex">
                                            <span className='text-sm lg:text-base flex flex-start' style={{
                                                width: '60%'
                                            }}>{formatCurrency(product.don_gia)}</span>

                                            <span
                                                style={{
                                                    width: '20%'
                                                }}
                                                className='lg:block hidden text-sm lg:text-base flex items-center'>
                                                x
                                            </span>

                                            <span style={{
                                                width: '20%'
                                            }} className='lg:block hidden text-sm lg:text-base'>{product.so_luong}</span>
                                        </div>

                                    </div>

                                    <div className='lg:text-base text-sm lg:hidden block'>Số lượng: {product.so_luong}</div>
                                </>
                            })}
                        </div>
                    </div>
            }

            {!isLoading && <div >
                <h3 className='font-bold'>Tổng cộng: <span className='text-xl'>{formatCurrency(order.tong_tien)}</span></h3>
            </div>}
        </div>
    )
}

export default FormOrderDetail