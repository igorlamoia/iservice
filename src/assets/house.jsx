export default function house({ light, w = 112, h = 110 }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 112 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.946 52.6003V109.093H91.3461V52.6003"
        stroke={light ? 'black' : 'white'}
        stroke-width="1.4"
        stroke-miterlimit="22.93"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.5"
        d="M48.0768 61.7387H74.4538V88.9234H48.0768V61.7387Z"
        fill="#2BE669"
      />
      <path
        d="M42.6306 57.4923H69.0076V84.677H42.6306V57.4923Z"
        stroke={light ? 'black' : 'white'}
        stroke-width="1.4"
        stroke-miterlimit="22.93"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.5"
        d="M111.654 55.1156L112 54.7464L58.5537 5.24634L57.8845 5.59249L57.5383 5.24634L37.5768 23.6156V5.24634H22.6921V37.3233L3.74597 54.7464L4.43829 55.1156L3.74597 55.8079L11.8691 64.8772L57.8614 22.6925L103.877 64.8772L112 55.8079L111.654 55.1156Z"
        fill="#2BE66A"
      />
      <path
        d="M19.946 33.4462V1H34.8307V19.4616"
        stroke={light ? 'black' : 'white'}
        stroke-width="1.4"
        stroke-miterlimit="22.93"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M109.277 50.5231L108.931 50.8693L109.277 51.5616L101.154 60.6308L55.1385 18.4462L9.1231 60.6308L1 51.5385L1.69232 50.8462L1 50.5L54.7924 1L55.1385 1.34615L55.8308 1L109.277 50.5V50.5231Z"
        stroke={light ? 'black' : 'white'}
        stroke-width="1.4"
        stroke-miterlimit="22.93"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
