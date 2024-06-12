import { useCallback, useEffect } from "react";
import { OrderClientHistory, getOrerHistoryAsyncAction } from "@/Redux/reducers/historyReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import Loading from "@/Components/Loading/Loading";
import BlankPage from "@/Components/BlankPage/BlankPage";
import { formatCurrency } from "@/Helper/helper";

export default function HistoryOrder() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoadingOrderHistory, orderHistory } = useSelector((state: RootState) => state.historyReducer);
  const dispatch: DispatchType = useDispatch();

  const getDataOrderHistoryAPI = useCallback(async () => {
    if (user?.nguoi_dung_id) {
      const actionApi = getOrerHistoryAsyncAction(user.nguoi_dung_id);
      dispatch(actionApi);
    }
  }, [user?.nguoi_dung_id, dispatch]);

  useEffect(() => {
    if (user?.nguoi_dung_id) {
      window.scrollTo(0, 0);
      getDataOrderHistoryAPI();
    }
  }, [user?.nguoi_dung_id, getDataOrderHistoryAPI]);


  const renderListingDonHang = (): JSX.Element[] => {
    if (!orderHistory) return [];

    // Group orders by don_hang_id
    const groupedOrders: { [key: number]: OrderClientHistory[] } = orderHistory.reduce((acc, item) => {
      if (!acc[item.don_hang_id]) {
        acc[item.don_hang_id] = [];
      }
      acc[item.don_hang_id].push(item);
      return acc;
    }, {} as { [key: number]: OrderClientHistory[] });

    // Generate JSX for each order group
    return Object.entries(groupedOrders).map(([don_hang_id, items], index) => {
      const totalAmount = items.reduce((total, item) => total + item.so_luong * item.don_gia, 0);

      return (
        <div className="mt-4" key={don_hang_id}>
          <h1 className="font-semibold md:text-2xl text-[#484848] mb-4">#{index + 1}</h1>
          {items.map((item, itemIndex) => (

            <div key={item.san_pham_id} className="md:grid grid-cols-1 md:grid-cols-5 gap-0 sm:gap-6 mb-4">
              <div className="md:col-span-1 flex">
                <div className="w-[27%] md:w-full">
                  <img src={item.hinh_anh} className="h-[100px] xl:me-28 mb-2 md:mb-0" alt={item.ten_san_pham} />
                </div>
                <h2 className="font-bold text-lg md:h-[48px] md:hidden">{item.ten_san_pham}</h2>
              </div>

              <div className="md:col-span-3">
                <h2 className="font-bold text-lg md:h-[48px] hidden md:block">{item.ten_san_pham}</h2>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm md:text-base">Số lượng</p>
                    <p className="text-sm md:text-base">x{item.so_luong}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">Đơn giá</p>
                    <p className="text-sm md:text-base">{formatCurrency(item.don_gia)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">Thành tiền</p>
                    <p className="text-sm md:text-base">{formatCurrency(item.so_luong * item.don_gia)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm md:text-base">Ngày mua</p>
                    <p className="text-sm md:text-base">{new Date(item.thoi_gian_dat_hang).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

          ))}
          {/* <button className="px-3 py-2 text-white bg-rose-500 hover:text-black rounded-md">Đánh giá</button> */}
          <p className="text-sm md:text-base text-end"><b>Tổng cộng:</b> {formatCurrency(totalAmount)}</p>
          <hr className="w-full" />
        </div>
      );
    });
  };



  const renderTripHistory = () => {
    if (orderHistory && orderHistory.length > 0) {
      return (
        <>
          <div className="ps-3 sm:ps-0">
            {renderListingDonHang()}
          </div>
        </>)
    } else {
      return (
        <>
          <div className="sm:mt-8 md:mt-12 lg:mt-[60px] border-b-[#989494] border-b-[1.5px] md:border-none">
            <BlankPage text="Lịch sử mua hàng trống" subText="Hãy đặt hàng ngay để có thể xem đơn đặt hàng đã mua" />
          </div>
          <div className="flex justify-center mb-4">
            <a href="/products" className="mt-4 bg-black text-white hover:bg-slate-200 hover:text-black border rounded-full px-[23px] py-[13px] font-bold">
              Bắt đầu mua hàng
            </a>
          </div>
          <hr />
          <p className="pb-9 pt-6 font-normal text-gray-500">
            Bạn không tìm thấy lịch sử mua hàng của mình ở đây?
            <a href='/contact' className="font-bold underline cursor-pointer text-black">
              Truy cập trang liên hệ.
            </a>
          </p>
        </>
      );
    }
  };

  return (
    isLoadingOrderHistory ? <Loading /> :
      <div className="container mx-auto">
        <h1 className="pt-4 sm:pt-9 mb-2 sm:pb-6 text-xl lg:text-3xl xl:text-4xl font-bold text-[#393939]">Lịch sử mua hàng</h1>
        <hr />

        <div className="pb-12">{renderTripHistory()}</div>


      </div>
  );
}
