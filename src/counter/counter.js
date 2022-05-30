window.onload = () => {
  const counter = document.querySelector("#counter")
  const update = () => counter.dispatchEvent(new Event('update'))
  counter.addEventListener("update", event => {
    counter.innerHTML = window.state.value()
  })

  document.querySelectorAll("button").forEach(B =>
    B.addEventListener("click", event => {
      event.preventDefault()
      const {classList} = event.target
      switch (true) {
      case classList.contains("increment"):
        window.state.increment()
        update()
        break
      case classList.contains("decrement"):
        window.state.decrement()
        update()
        break
      }
    })
  )
  update()
}
