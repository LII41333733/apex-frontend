import React from 'react';

const ChartWrapper: React.FC<
    React.PropsWithChildren<{ className: string }>
> = ({ children, className }) => {
    const size = `card apex-card h-[330px] ${className}`;
    return <div className={size}>{children}</div>;
};

export default ChartWrapper;
