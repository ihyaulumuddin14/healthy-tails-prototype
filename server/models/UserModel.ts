import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   fullName: {
      type: String,
      required: true,
      unique: false
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      unique: false
   },
   role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
   },
   resetOTP: { type: String },
   resetOTPExpiry: { type: Date },
   canResetPassword: { type: Boolean, default: false },
   resetSessionExpiry: { type: Date },
})

export default mongoose.model('users', UserSchema);