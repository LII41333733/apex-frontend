import { primary } from '@/utils/colors';

const CircleCheck: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-circle-check circle-check"
        width="22"
        height="22"
        viewBox="0 0 24 24.9"
        strokeWidth="1.5"
        stroke={primary()}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M10 0h12v19H0z" fill="#0c0a09" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 12l2 2l4 -4" />
    </svg>
);

export default CircleCheck;
