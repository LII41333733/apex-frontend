import { primary } from '@/utils/colors';

export default function ({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={primary()}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={`icon icon-tabler icons-tabler-outline icon-tabler-square-letter-a inline ${
                className || ''
            }`}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M10 16v-6a2 2 0 1 1 4 0v6" />
            <path d="M10 13h4" />
        </svg>
    );
}