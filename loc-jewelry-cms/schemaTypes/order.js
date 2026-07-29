export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'cartId', title: 'Cart ID', type: 'string' },
    { name: 'customerName', title: 'Customer Name', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'address', title: 'Delivery Address', type: 'text' },
    {
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productName', title: 'Product Name', type: 'string' },
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'color', title: 'Color', type: 'string' },
            { name: 'price', title: 'Price', type: 'string' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'image', title: 'Image URL', type: 'string' },
          ],
        },
      ],
    },
    { name: 'total', title: 'Total (₦)', type: 'number' },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Payment', value: 'pending_payment' },
          { title: 'Paid', value: 'paid' },
          { title: 'Failed', value: 'failed' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
        ],
      },
      initialValue: 'pending_payment',
    },
    { name: 'paystackReference', title: 'Paystack Reference', type: 'string' },
    { name: 'createdAt', title: 'Created At', type: 'datetime' },
  ],
}