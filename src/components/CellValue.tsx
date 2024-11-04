import * as React from 'react';

const CellValue: React.FC<{
    id?: string;
    value?: any;
    addDecimals?: boolean;
    className?: string;
}> = ({ id, value, addDecimals, className }) => {
    console.log({ id, value, addDecimals, className });
    return (
        <div className={`table-data ${id} ${className}`}>
            {value === null || value === undefined
                ? '-'
                : addDecimals && id
                  ? value.toFixed(2)
                  : value}
        </div>
    );
};

export default CellValue;
