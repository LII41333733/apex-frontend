import { primary } from '@/utils/colors';

const CircleCheckFilled: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-circle-check-filled circle-check"
        width="22"
        height="22"
        viewBox="0 0 24 24.9"
        strokeWidth="1.5"
        stroke={primary()}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="5" fill="#0c0a09" />
        <path
            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
            strokeWidth="0"
            fill={primary()}
        />
    </svg>
);

export default CircleCheckFilled;
