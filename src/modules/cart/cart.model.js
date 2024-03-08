import { Schema, model } from 'mongoose';

const CartSchema = Schema({
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
      required: [true, 'Quantity is required'],
      default: 1
    }
  }],
  totalPrice: {
    type: Number,
    default: 0
  }
});

export default model('Cart', CartSchema);
