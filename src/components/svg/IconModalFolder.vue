<template>
  <g class="modal_folder">
    <polygon
      class="st0"
      points="27.1,68.7 28,147.2 3.3,168.3 4,440.7 42,479.2 659.3,479.2 685.9,442.4 685.9,244.2 695.7,244.2 
	695.7,68.7 "
    />
    <polygon
      class="st1"
      points="61.1,29.5 470.9,27.9 507.6,2.6 648,2.6 695.7,51.3 695.7,68.7 27.1,68.7 "
    />
    <ellipse class="st2" cx="468.2" cy="30.5" rx="4" ry="4.1" />
    <ellipse class="st2" cx="489.4" cy="4.1" rx="4" ry="4.1" />
    <ellipse class="st2" cx="695.7" cy="295.1" rx="3.3" ry="3.4" />
    <ellipse class="st2" cx="685.9" cy="240.8" rx="3.3" ry="3.4" />
    <polygon class="st3" points="435,479.2 435,500 644.2,500 659.3,479.2 " />
    <polyline
      class="st4"
      points="470.9,27.9 507.6,2.6 648,2.6 695.7,51.3 695.7,291.7 "
    />
    <polyline
      class="st4"
      points="685.9,244.2 685.9,442.4 644.2,500 435,500 435,479.2 "
    />
    <line class="st4" x1="58.2" y1="489.4" x2="435" y2="490" />
    <ellipse class="st3" cx="57.9" cy="489.3" rx="3.3" ry="3.4" />
    <path class="st1" d="M459.8,74.5" />
    <polygon class="st1" points="435,479.2 435,500 644.2,500 659.3,479.2 " />
    <polyline
      class="st4"
      points="3.3,168.3 28,147.2 27.1,68.7 61.1,29.5 451.6,28.5 486.1,6.6 "
    />
    <polyline
      class="st4"
      points="27.1,165.9 4,185.6 4,440.7 42,479.2 659.3,479.2 685.9,442.4 685.9,244.2 "
    />
    <polygon class="st4" points="435,479.2 435,500 644.2,500 659.3,479.2 " />
    <ellipse class="st2" cx="3.3" cy="168.3" rx="3.3" ry="3.4" />
    <ellipse class="st2" cx="28.7" cy="164.9" rx="3.3" ry="3.4" />
    <g>
      <foreignObject y="0%" x="0" width="100%" height="100%">
        <slot />
      </foreignObject>
    </g>
  </g>
</template>

<style scoped>
.modal_folder > .st0 {
  fill: #ffffff;
}
.modal_folder > .st1 {
  fill: #aaff48;
}
.modal_folder > .st2 {
  fill: #aaff48;
  stroke: #231f20;
  stroke-width: 1.402;
  stroke-miterlimit: 10;
}
.modal_folder > .st3 {
  fill: #aaff48;
  stroke: #231f20;
  stroke-width: 0.701;
  stroke-miterlimit: 10;
}
.modal_folder > .st4 {
  fill: none;
  stroke: #231f20;
  stroke-width: 1.4022;
  stroke-miterlimit: 10;
}
</style>
