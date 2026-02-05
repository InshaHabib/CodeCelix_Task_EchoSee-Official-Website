'use client';

import { memo, useState, useEffect } from 'react';

// Long, smooth, shining and glowing animated lines - SLOW speed
function AnimatedLines() {
    const [mounted, setMounted] = useState(false);

    // Only render on client to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="animated-lines" aria-hidden="true" />;
    }

    return (
        <div
            className="animated-lines"
            aria-hidden="true"
            style={{ contain: 'paint' }}
        >
            <svg
                viewBox="0 0 1200 800"
                preserveAspectRatio="none"
                style={{ transform: 'translateZ(0)' }}
            >
                {/* Enhanced Glow & Shine Filters - Optimized for Performance */}
                <defs>
                    {/* Intense Orange Glow - Reduced region and deviation for performance */}
                    <filter id="glowOrangeIntense" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="blur1" />
                        <feGaussianBlur stdDeviation="3" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Intense Purple Glow */}
                    <filter id="glowPurpleIntense" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur1" />
                        <feGaussianBlur stdDeviation="4" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Shine Effect */}
                    <filter id="shine" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.2  0 1 0 0 0.1  0 0 1 0 0  0 0 0 1 0" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Long Smooth Flowing Line 1 - Top */}
                <path
                    d="M-300,100 C0,50 200,180 450,120 C700,60 850,200 1100,140 C1350,80 1500,180 1700,100"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    opacity="0.6"
                    filter="url(#glowOrangeIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="18s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1200 2800;1200 2800;0 4000"
                        dur="18s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Following line for continuous effect */}
                <path
                    d="M-300,100 C0,50 200,180 450,120 C700,60 850,200 1100,140 C1350,80 1500,180 1700,100"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="3"
                    opacity="0.5"
                    filter="url(#glowOrangeIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="18s"
                        begin="9s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1200 2800;1200 2800;0 4000"
                        dur="18s"
                        begin="9s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Long Smooth Flowing Line 2 - Middle Upper */}
                <path
                    d="M-300,280 C50,350 250,220 500,300 C750,380 900,250 1150,320 C1400,390 1500,280 1700,330"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    opacity="0.5"
                    filter="url(#glowPurpleIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="24s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1400 2600;1400 2600;0 4000"
                        dur="24s"
                        repeatCount="indefinite"
                    />
                </path>

                <path
                    d="M-300,280 C50,350 250,220 500,300 C750,380 900,250 1150,320 C1400,390 1500,280 1700,330"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="3"
                    opacity="0.4"
                    filter="url(#glowPurpleIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="24s"
                        begin="12s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1400 2600;1400 2600;0 4000"
                        dur="24s"
                        begin="12s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Long Smooth Flowing Line 3 - Middle */}
                <path
                    d="M-300,450 C100,380 300,520 550,430 C800,340 950,500 1200,420 C1450,340 1550,480 1700,400"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    opacity="0.55"
                    filter="url(#shine)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="21s"
                        begin="3s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1300 2700;1300 2700;0 4000"
                        dur="21s"
                        begin="3s"
                        repeatCount="indefinite"
                    />
                </path>

                <path
                    d="M-300,450 C100,380 300,520 550,430 C800,340 950,500 1200,420 C1450,340 1550,480 1700,400"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="2.5"
                    opacity="0.45"
                    filter="url(#shine)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="21s"
                        begin="13.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1300 2700;1300 2700;0 4000"
                        dur="21s"
                        begin="13.5s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Long Smooth Flowing Line 4 - Bottom */}
                <path
                    d="M-300,620 C0,700 250,550 500,650 C750,750 950,600 1200,680 C1450,760 1550,650 1700,700"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.5"
                    opacity="0.45"
                    filter="url(#glowPurpleIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="27s"
                        begin="6s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1500 2500;1500 2500;0 4000"
                        dur="27s"
                        begin="6s"
                        repeatCount="indefinite"
                    />
                </path>

                <path
                    d="M-300,620 C0,700 250,550 500,650 C750,750 950,600 1200,680 C1450,760 1550,650 1700,700"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                    opacity="0.35"
                    filter="url(#glowPurpleIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="4000"
                        to="0"
                        dur="27s"
                        begin="19.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 4000;1500 2500;1500 2500;0 4000"
                        dur="27s"
                        begin="19.5s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Diagonal Shine Line 1 */}
                <path
                    d="M-200,850 C100,700 300,750 500,550 C700,350 850,400 1050,200 C1250,0 1400,50 1600,-100"
                    fill="none"
                    stroke="#fb923c"
                    strokeWidth="2"
                    opacity="0.4"
                    filter="url(#glowOrangeIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="3500"
                        to="0"
                        dur="30s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 3500;1000 2500;1000 2500;0 3500"
                        dur="30s"
                        repeatCount="indefinite"
                    />
                </path>

                <path
                    d="M-200,850 C100,700 300,750 500,550 C700,350 850,400 1050,200 C1250,0 1400,50 1600,-100"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    opacity="0.3"
                    filter="url(#glowOrangeIntense)"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="3500"
                        to="0"
                        dur="30s"
                        begin="15s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="stroke-dasharray"
                        values="0 3500;1000 2500;1000 2500;0 3500"
                        dur="30s"
                        begin="15s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
}

export default memo(AnimatedLines);
