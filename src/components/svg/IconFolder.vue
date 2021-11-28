<template>
  <g class="folder">
    <polygon
      class="st0"
      points="26.014 76.331 493.493 76.331 493.493 60.535 460.189 16.15 361.971 16.15 334.929 40.908 49.71 40.607"
    ></polygon>
    <polyline
      class="st1"
      points="5.243 244.652 26.014 230.048 26.014 76.331 49.71 40.607 322.46 39.173 352.01 17.592"
    ></polyline>
    <polyline
      class="st1"
      points="26.014 238.041 7.523 250.105 5.243 416.267 31.805 450.041 468.026 450.041 486.605 416.525 486.605 236.14"
    ></polyline>
    <polyline
      class="st1"
      points="336.319 39.101 361.971 16.15 460.189 16.15 493.493 60.535 493.493 279.414"
    ></polyline>
    <polygon
      class="st2"
      points="311.17 450.041 311.17 469.063 457.479 469.063 468.026 450.041"
    ></polygon>
    <line class="st1" x1="49.752" y1="459.226" x2="311.17" y2="459.877"></line>
    <circle
      class="st3"
      cx="24.941"
      cy="266.689"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="1.548"
      cy="276.248"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="43.15"
      cy="490.714"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="466.216"
      cy="263.634"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="472.852"
      cy="313.163"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="320.089"
      cy="70.81"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <circle
      class="st3"
      cx="336.545"
      cy="47.415"
      r="3.113"
      transform="matrix(1.037973, 0, 0, 0.996691, 2.685534, -29.666348)"
    ></circle>
    <g>
      <foreignObject y="9.5%" x="0" width="100%" height="100%">
        <slot />
      </foreignObject>
    </g>
  </g>
</template>

<style scope>
.folder > .st0 {
  fill: #aaff48;
  stroke-width: 1;
  stroke-miterlimit: 10;
}
.folder > .st1 {
  fill: none;
  stroke: #231f20;
  stroke-width: 2;
  stroke-miterlimit: 10;
}
.folder > .st2 {
  fill: #aaff48;
  stroke: #231f20;
  stroke-width: 2;
  stroke-miterlimit: 10;
}
.folder > .st3 {
  fill: #aaff48;
  stroke: #231f20;
  stroke-width: 3;
  stroke-miterlimit: 10;
}
</style>
