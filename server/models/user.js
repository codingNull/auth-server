const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const UserSchema = new Schema({
    email: {type:String,unique:true,lowercase:true},
    password: String
});
//on save hook, encrypt the password
UserSchema.pre('save',function(next){
    //console.log('11111111');
    const user = this;
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password,salt,null,function(err,hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    }); 
});

UserSchema.methods.comparePassword = function(candidatePassword,callback){
  bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    callback(err,isMatch);
  });
}


//create a model class
const ModelClass = mongoose.model('user',UserSchema);

module.exports = ModelClass;
//mongodb+srv://yunlongau:<password>@cluster0.1xddm.mongodb.net/<dbname>?retryWrites=true&w=majority

// Define our model
/* const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass; */