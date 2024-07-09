import React from "react";
import { IoMdClose } from "react-icons/io";
import img1 from "../../assets/img_home/16.jpg";
import img2 from "../../assets/img_home/17.jpg";
import img3 from "../../assets/img_home/26.jpeg";
import img4 from "../../assets/img_home/27.jpeg";
interface ModalProps {
  show: boolean;
  closeModal: () => void;
}

const FieldLife: React.FC<ModalProps> = ({ show, closeModal }) => {
  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 mx-4 my-4 w-full max-w-[90%] max-h-[90%] lg:max-w-[1300px] lg:h-[650px] relative overflow-auto">
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={closeModal}
            >
              <IoMdClose size={30} />
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Cuộc sống thực địa
            </h2>
            <div className="mx-auto text-center">
              <span className="text-gray-600 text-base">
                Việc có bệnh nhân là rất quan trọng nhưng tôi sẽ phải trả tiền
                cho việc đó Lúc đó họ lâm vào tình trạng chuyển dạ và đau đớn
                tột độ. Bằng vì tôi sẽ đến ít nhất, người không thực hiện bất kỳ
                loại công việc nào ngoại trừ một số trong đó có thể hữu ích.
                Đừng để nỗi đau biến mất khi bị quở trách, khi vui sướng, nó
                muốn làm một sợi tóc, và khi đau đớn nó chạy trốn không có sự
                giao phối.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 mt-3 gap-5">
              <div className="relative overflow-hidden">
                <img
                  src={img1}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img2}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img3}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={img4}
                  alt=""
                  className="w-full h-full object-cover transform scale-100 transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FieldLife;
