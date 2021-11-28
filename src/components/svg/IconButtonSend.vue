<template>
  <g class="icon__button_send">
    <polygon
      class="st0"
      points="437.7,186.5 64.2,186.5 32.1,242.1 64.2,297.7 437.7,297.7 469.8,242.1 "
    />
    <polygon
      class="st1"
      points="434.9,186.5 61.4,186.5 29.3,242.1 61.4,297.7 434.9,297.7 467,242.1 "
    />
    <polyline
      class="st2"
      points="128.7,186.5 61.4,186.5 29.3,242.1 61.4,297.7 128.7,297.7 "
    />
    <polyline
      class="st2"
      points="367.5,186.5 434.9,186.5 467,242.1 434.9,297.7 367.5,297.7 "
    />
    <polyline class="st3" points="24.9,211.5 7.3,242.1 24.9,272.7 " />
    <polyline class="st3" points="471.3,211.5 489,242.1 471.3,272.7 " />
    <path class="st4" d="M7.3,242.1" />
    <foreignObject
      y="38.5%"
      x="0"
      width="100%"
      height="100%"
      style="font-size: 5rem"
    >
      <slot />
    </foreignObject>
  </g>
</template>
<style scoped>
.icon__button_send > .st0 {
  fill: none;
  stroke: #020202;
  stroke-width: 2.945;
  stroke-miterlimit: 10;
}
.icon__button_send > .st1 {
  opacity: 0.2;
  stroke: #000000;
  stroke-width: 2.945;
  stroke-miterlimit: 10;
  enable-background: new;
}
.icon__button_send > .st2 {
  fill: none;
  stroke: #000000;
  stroke-width: 13.1078;
  stroke-miterlimit: 10;
}
.icon__button_send > .st3 {
  fill: none;
  stroke: #000000;
  stroke-width: 5.2431;
  stroke-miterlimit: 10;
}
.icon__button_send > .st4 {
  fill: none;
  stroke: #6f9c4a;
  stroke-width: 5.2431;
  stroke-miterlimit: 10;
}
</style>
