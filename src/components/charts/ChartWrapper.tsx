import React from 'react';

const ChartWrapper: React.FC<
    React.PropsWithChildren<{ className: string; isExtended?: boolean }>
> = ({ children, className, isExtended }) => {
    const size = `card apex-card h-[330px] ${className} ${
        isExtended ? 'w-full' : 'w-unset'
    }`;
    return <div className={size}>{children}</div>;
};

export default ChartWrapper;
