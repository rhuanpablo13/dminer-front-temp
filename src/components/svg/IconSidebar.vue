<template>
  <g class="icon_sidebar">
    <polygon
      class="st0"
      points="0,0.5 0,650 127.9,650 127.5,136 144.5,128 144.5,0.5 "
    />
    <polyline class="st1" points="144.5,0.5 144.5,128 120,139.5 " />
    <polyline class="st1" points="127.9,650 127.5,145.2 144.5,136.8 " />
    <ellipse class="st2" cx="120.4" cy="139" rx="2.1" ry="2.1" />
    <ellipse class="st2" cx="145" cy="136.5" rx="2.1" ry="2.1" />
  </g>
  <g>
    <foreignObject y="0" x="0" width="100%" height="100%">
      <slot />
    </foreignObject>
  </g>
</template>

<style scoped>
.icon_sidebar > .st0 {
  fill: url(#SVGID_1_);
}
.icon_sidebar > .st1 {
  fill: none;
  stroke: #000000;
  stroke-width: 0.7169;
  stroke-miterlimit: 10;
}
.icon_sidebar > .st2 {
  fill: #aaff48;
  stroke: #020202;
  stroke-width: 0.7169;
  stroke-miterlimit: 9.9998;
}
</style>
