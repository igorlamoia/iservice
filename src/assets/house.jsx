export default function house({ light, size }) {
  if (light) {
    return (
      <svg
        width={size}
        // height={h}
        viewBox="0 0 112 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.946 52.6003V109.093H91.3461V52.6003"
          stroke="black"
          strokeWidth="1.4"
          strokeMiterlimit="22.93"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M48.0768 61.7387H74.4538V88.9234H48.0768V61.7387Z"
          fill="#2BE669"
        />
        <path
          d="M42.6306 57.4923H69.0076V84.677H42.6306V57.4923Z"
          stroke="black"
          strokeWidth="1.4"
          strokeMiterlimit="22.93"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M111.654 55.1156L112 54.7464L58.5537 5.24634L57.8845 5.59249L57.5383 5.24634L37.5768 23.6156V5.24634H22.6921V37.3233L3.74597 54.7464L4.43829 55.1156L3.74597 55.8079L11.8691 64.8772L57.8614 22.6925L103.877 64.8772L112 55.8079L111.654 55.1156Z"
          fill="#2BE66A"
        />
        <path
          d="M19.946 33.4462V1H34.8307V19.4616"
          stroke="black"
          strokeWidth="1.4"
          strokeMiterlimit="22.93"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M109.277 50.5231L108.931 50.8693L109.277 51.5616L101.154 60.6308L55.1385 18.4462L9.1231 60.6308L1 51.5385L1.69232 50.8462L1 50.5L54.7924 1L55.1385 1.34615L55.8308 1L109.277 50.5V50.5231Z"
          stroke="black"
          strokeWidth="1.4"
          strokeMiterlimit="22.93"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      viewBox="0 0 112 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8113 52.6003V109.093H91.2113V52.6003"
        stroke="url(#paint0_linear_352_773)"
        strokeOpacity="0.8"
        strokeWidth="1.4"
        strokeMiterlimit="22.93"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.9958 57.9923H68.3728V84.177H42.9958V57.9923Z"
        stroke="url(#paint1_linear_352_773)"
        strokeOpacity="0.8"
      />
      <g opacity="0.5">
        <path
          d="M47.9419 61.7386H74.3189V88.9233H47.9419V61.7386Z"
          fill="#00C87E"
        />
        <path
          d="M48.4419 62.2386H73.8189V88.4233H48.4419V62.2386Z"
          stroke="url(#paint2_linear_352_773)"
          strokeOpacity="0.8"
        />
      </g>
      <path
        d="M42.4958 57.4923H68.8728V84.677H42.4958V57.4923Z"
        stroke="url(#paint3_linear_352_773)"
        strokeOpacity="0.8"
        strokeWidth="1.4"
        strokeMiterlimit="22.93"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-6-inside-1_352_773" fill="white">
        <path d="M19.8113 33.4462V1H34.6959V19.4616" />
      </mask>
      <path
        d="M19.8113 1V0H18.8113V1H19.8113ZM34.6959 1H35.6959V0H34.6959V1ZM20.8113 33.4462V1H18.8113V33.4462H20.8113ZM19.8113 2H34.6959V0H19.8113V2ZM33.6959 1V19.4616H35.6959V1H33.6959Z"
        fill="url(#paint4_linear_352_773)"
        fillOpacity="0.8"
        mask="url(#path-6-inside-1_352_773)"
      />
      <path
        d="M108.349 51.0929L108.543 51.4812L100.984 59.9205L55.3417 18.0776L55.0038 17.7679L54.6659 18.0776L9.02378 59.92L1.553 51.5579L1.9111 51.1998L2.40163 50.7092L1.78116 50.399L1.73729 50.3771L54.6432 1.69271L54.6502 1.69972L54.9051 1.95453L55.2274 1.79336L55.6102 1.60196L108.433 50.525L108.188 50.7706L108.349 51.0929Z"
        stroke="url(#paint5_linear_352_773)"
        strokeOpacity="0.8"
      />
      <g opacity="0.5">
        <path
          d="M111.519 55.1156L111.865 54.7464L58.4191 5.24634L57.7498 5.59249L57.4037 5.24634L37.4421 23.6156V5.24634H22.5575V37.3233L3.61133 54.7464L4.30364 55.1156L3.61133 55.8079L11.7344 64.8772L57.7268 22.6925L103.742 64.8772L111.865 55.8079L111.519 55.1156Z"
          fill="#00C87E"
        />
        <path
          d="M111.154 54.7736L110.916 55.0277L111.072 55.3392L111.266 55.7275L103.707 64.1668L58.0647 22.3239L57.7267 22.0141L57.3888 22.324L11.7693 64.1667L4.29951 55.8269L4.6572 55.4692L5.13437 54.992L4.53893 54.6744L4.46887 54.6371L22.8959 37.6913L23.0575 37.5428V37.3233V5.74634H36.9421V23.6156V24.7552L37.7807 23.9835L57.3893 5.93907L57.3963 5.94603L57.6548 6.20456L57.9795 6.0366L58.3369 5.85175L111.156 54.7714L111.154 54.7736Z"
          stroke="url(#paint6_linear_352_773)"
          strokeOpacity="0.8"
        />
      </g>
      <path
        d="M19.8113 33.4462V1H34.6959V19.4616"
        stroke="url(#paint7_linear_352_773)"
        strokeOpacity="0.8"
        strokeWidth="1.4"
        strokeMiterlimit="22.93"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M109.142 50.5231L108.796 50.8693L109.142 51.5616L101.019 60.6308L55.0038 18.4462L8.98833 60.6308L0.865234 51.5385L1.55755 50.8462L0.865234 50.5L54.6576 1L55.0038 1.34615L55.6961 1L109.142 50.5V50.5231Z"
        stroke="url(#paint8_linear_352_773)"
        strokeOpacity="0.8"
        strokeWidth="1.4"
        strokeMiterlimit="22.93"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_352_773"
          x1="90.2964"
          y1="51.4715"
          x2="60.076"
          y2="167.595"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.208333" stopColor="#95F3B4" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.390625" stopColor="#00C87E" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_352_773"
          x1="104.06"
          y1="34.0215"
          x2="49.0247"
          y2="131.662"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.494792" stopColor="#95F3B4" />
          <stop offset="0.75" stopColor="#2BE669" stopOpacity="0" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_352_773"
          x1="73.9809"
          y1="61.1954"
          x2="55.8399"
          y2="114.71"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.208333" stopColor="#95F3B4" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.390625" stopColor="#00C87E" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_352_773"
          x1="68.5348"
          y1="56.9491"
          x2="50.3938"
          y2="110.464"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.208333" stopColor="#95F3B4" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.390625" stopColor="#00C87E" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_352_773"
          x1="54.5524"
          y1="-27.0135"
          x2="-21.0582"
          y2="36.4084"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.494792" stopColor="#95F3B4" />
          <stop offset="0.75" stopColor="#2BE669" stopOpacity="0" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_352_773"
          x1="253.587"
          y1="-50.4843"
          x2="175.652"
          y2="208.267"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.494792" stopColor="#95F3B4" />
          <stop offset="0.75" stopColor="#2BE669" stopOpacity="0" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_352_773"
          x1="256.279"
          y1="-46.238"
          x2="178.33"
          y2="212.504"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.494792" stopColor="#95F3B4" />
          <stop offset="0.75" stopColor="#2BE669" stopOpacity="0" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_352_773"
          x1="54.5524"
          y1="-27.0135"
          x2="-21.0582"
          y2="36.4084"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.494792" stopColor="#95F3B4" />
          <stop offset="0.75" stopColor="#2BE669" stopOpacity="0" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_352_773"
          x1="107.755"
          y1="-0.191582"
          x2="84.8006"
          y2="126.527"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#090A0A" />
          <stop offset="0.208333" stopColor="#95F3B4" />
          <stop offset="0.276042" stopColor="#B3FFBD" />
          <stop offset="0.390625" stopColor="#00C87E" />
          <stop offset="0.953297" stopColor="#00AD6E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
