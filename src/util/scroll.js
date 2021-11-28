export const disableScrolling = (e) => {
  var x = e.scrollX
  var y = e.scrollY
  e.onscroll = function () {
    e.scrollTo(x, y)
  }
}

export const enableScrolling = (e) => {
  e.onscroll = function () {}
}
