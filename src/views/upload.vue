<template>
  <div id='container'> <input type='button' value='+' id='add-file-btn' @click='click' /> </div>
</template>

<script>
export default {
  created () {

  },
  methods: {
    click (e) {
      let answer = window.prompt('Qual o endereço?')   
      // usamos uma expressão regular para verificarmos se é uma URL válida   
      if (answer.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/im)) {     
      // podemos opcionalmente parsear esta url em um objeto do tipo URL     
        this.appendTheFile(answer)   
      } 
    },
    appendTheFile (url) {    
       url = new URL(url)     // se for uma imagem, adicionamos uma imagem     
       if (url.pathname.match(/\.(jpe?g|png|svg|webp|gif)/)) {       
        //  let img = document.createElement('img')       
        //  img.src = url.toString()       
        //  document.getElementById('container').appendChild(img)     
        window.open(url, '_blank')
      } else {       // se não for uma imagem, usamos um iframe       
        window.open(url, '_blank')
        // let iframe = document.createElement('iframe')       
        // iframe.src = url.toString()       
        // document.getElementById('container').appendChild(iframe)

      }    
    }
  }
}
</script>