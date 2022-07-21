import React from 'react';
import { SvgBox } from './styles';

export default function Warning() {
    return (
        <SvgBox>
            <svg className="circular yellow-stroke">
                <circle className="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
            </svg>
            <svg className="alert-sign yellow-stroke">
                <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                    <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                        <path className="line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                    </g>
                    <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                        <circle className="dot" cx="621.52" cy="316.126" r="1.318" />
                    </g>
                </g>
            </svg>
        </SvgBox>
    );
}