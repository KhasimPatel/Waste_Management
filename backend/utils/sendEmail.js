const bcrypt = require('bcrypt');

employeeSchema.pre('save', async function (next) {
  // agar password change hua hai tabhi hash karna
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
