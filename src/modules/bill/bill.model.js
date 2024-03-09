import { Schema, model } from 'mongoose';

const BillSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required']
    }
  }],
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required']
  }
});

export default model('Bill', BillSchema);
