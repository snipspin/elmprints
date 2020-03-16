let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let addressSchema = new mongoose.Schema({
  streetOne: {
    type: String
  },
  streetTwo: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: Number,
    minlength: 5
  }
})

let cartSchema = new mongoose.Schema({
  items: Array[String]
})

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  lastname: String,
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 24
  },
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  shoppingCart: cartSchema
})

// hash password
userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
})

// Ensure password transfer safety
userSchema.set('toJSON', {
  transform: (doc, user) => {
    delete user.password;
    return user;
  }
})

// Compare given password to password hash
userSchema.methods.isAuthenticated = function(typedPassword) {
  return bcrypt.compareSync(typedPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);