import { useState } from 'react';

import "./styles.scss";
import { isNumberKey, isNumberMobile } from '@/Helper/helper';

type PropTypes = {
    defaultValue: number;
    onChanged?: Function;
    hasPreventByLimit?: boolean;
    limit?: number;
    fullWidth?: boolean;
    isMobile?: boolean
}

function Quantity(props: PropTypes) {
    const { defaultValue, onChanged, limit = 0, hasPreventByLimit, fullWidth = false, isMobile = false } = props
    const [value, setValue] = useState(defaultValue);

    const increment = () => {
        const param = value + 1;

        //* Trường hợp đặt hàng quá số lượng tồn hàng trong kho
        if (hasPreventByLimit && param > limit) {
            return;
        }

        setValue(param);
        onChanged && onChanged(param)
    }

    const decrement = () => {
        if (value <= 1) return;

        const param = value - 1;
        setValue(param);
        onChanged && onChanged(param)
    }

    const onChangeInput = (input: string) => {
        let returnValue = +input;

        if (hasPreventByLimit && +input > limit) {
            returnValue = limit
        }

        setValue(returnValue);
        onChanged && onChanged(returnValue);
    }

    return (
        <div className={`quantity-input ${isMobile && "quantity-input_mobile"} ${fullWidth && "quantity-input_full"}`} >
            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
                &mdash;
            </button>

            <input
                className="quantity-input__screen"
                type="text"
                value={value}
                onKeyPress={(e) => {
                    if (!isNumberKey(e)) {
                        e.preventDefault();
                    }
                }}
                onKeyUp={(e) => {
                    isNumberMobile(e)
                }}
                onChange={(e: any) => {
                    onChangeInput(e.target.value)
                }}
            />

            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
                &#xff0b;
            </button>
        </div>
    )
}

export default Quantity