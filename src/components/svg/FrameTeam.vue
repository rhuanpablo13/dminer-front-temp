<template>
  <g class="frame_equipe">
    <polyline class="st0" points="9.1,20.6 9.1,185.4 310.4,185.4 "/>
    <polyline class="st0" points="189.8,16.5 456.8,16.5 490.9,49.4 490.9,177.5 "/>
    <circle class="st1" cx="9.1" cy="15.1" r="6.2"/>
    <circle class="st1" cx="317.1" cy="184.9" r="6.2"/>
    <circle class="st1" cx="182.9" cy="15.1" r="6.2"/>
    <circle class="st1" cx="490.9" cy="183.5" r="6.2"/>
    <g>
      <foreignObject y="15%" x="0" width="100%" height="100%">
        <slot />
      </foreignObject>
    </g>
  </g>
</template>

<style scoped>
	.frame_equipe > .st0{fill:none;stroke:#020202;stroke-width:1.9645;stroke-miterlimit:10;}
	.frame_equipe > .st1{fill:#AAFF48;stroke:#020202;stroke-width:1.9645;stroke-miterlimit:10;}
</style>
