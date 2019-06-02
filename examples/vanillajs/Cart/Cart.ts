const Cart = node => {
  node.innerHTML = `
    <div id="cart">
      <button id="remove">-</button>
      <span id="products" data-test="products">10</span>
      <button id="add">+</button>
    </div>
  `

  const cart = node.querySelector('#cart')
  const removeButton = node.querySelector('#remove')
  const products = node.querySelector('#products')
  const addButton = node.querySelector('#add')
  cart._products = 10

  removeButton.addEventListener('click', remove)
  addButton.addEventListener('click', add)

  function remove() {
    cart._products--
    products.textContent = cart._products
  }

  function add() {
    cart._products++
    products.textContent = cart._products
  }
}

export { Cart }