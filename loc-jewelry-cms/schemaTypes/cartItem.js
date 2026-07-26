export default {
  name: 'cartItem',
  title: 'Cart Item',
  type: 'document',
  fields: [
    { name: 'cartId', title: 'Cart ID', type: 'string' },
    { name: 'productKey', title: 'Product Key', type: 'string' },
    { name: 'productName', title: 'Product Name', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'image', title: 'Image URL', type: 'string' },
    { name: 'quantity', title: 'Quantity', type: 'number', initialValue: 1 },
    { name: 'createdAt', title: 'Created At', type: 'datetime' },
  ],
}