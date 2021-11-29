<template>
  <g class="feed">
    <polygon
      class="st0"
      points="40,30 223.9,30 223.9,486.5 220.1,491.5 47.5,491.5 34.7,478 34.7,243 39.8,239 	"
    />
    <polygon
      class="st1"
      points="130.7,491.5 130.7,497.1 215.9,497.1 220.1,491.5 	"
    />
    <polygon
      class="st1"
      points="40,30 223.9,30 223.9,14.4 216.9,6 159,6 142.5,16.5 54,16 	"
    />
    <g class="feed">
      <polyline
        class="st2"
        points="29,243 40,234 40,30 54,16 134.7,16 151,6 		"
      />
      <polyline
        class="st2"
        points="45.5,234.5 34.7,243 34.7,478 47.5,491.5 130.7,491.5 130.7,497.1 215.9,497.1 223.9,486.5 
			223.9,14.4 216.9,6 159,6 142.5,16.5 		"
      />
      <line class="st2" x1="130.7" y1="495.1" x2="52.9" y2="495.1" />
      <circle class="st3" cx="51.5" cy="495.5" r="2" />
      <circle class="st3" cx="28" cy="244" r="2.5" />
      <circle class="st3" cx="46.1" cy="233" r="2.5" />
      <circle class="st3" cx="152.5" cy="5.5" r="2" />
      <circle class="st3" cx="141.5" cy="17.5" r="2" />
    </g>
  </g>
  <foreignObject y="0%" x="0" width="100%" height="100%" class="content__feed">
    <slot />
  </foreignObject>
</template>

<style>
.feed > .st0 {
  fill: #ffffff;
  stroke-width: 1;
  stroke-miterlimit: 10;
}
.feed > .st1 {
  fill: #aaff48;
  stroke-width: 1;
}
.feed > .st2 {
  fill: none;
  stroke: #363636;
  stroke-width: 1;

  stroke-miterlimit: 10;
}
.feed > .st3 {
  fill: #aaff48;
  stroke: #363636;
  stroke-width: 1;
  stroke-miterlimit: 10;
}
</style>
