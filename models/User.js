const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: string,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"]
  },
  
  thougths: [ 
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
  }
],

  friends: [ {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
  ]
}, {
toJSON: {
  virtuals: true
},
id: false
});

userSchema.virtual("frinedCount").get(function(){
  return this.friends.length;
})

const User = model("User", userSchema)

module.exports = User;
