const bcrypt = require('bcrypt');

const users = [
  { userId:1, email:"user1@example.com", password:"password123", role:"customer" },
  { userId:2, email:"user2@example.com", password:"password456", role:"artist" },
  { userId:3, email:"user3@example.com", password:"password789", role:"customer" },
  { userId:4, email:"user4@example.com", password:"passwordabc", role:"artist" },
  { userId:5, email:"user5@example.com", password:"passworddef", role:"admin" },
  { userId:7, email:"admin@example.com", password:"adminpass123", role:"admin" },
  { userId:8, email:"artist1@example.com", password:"artistpass123", role:"artist" },
  { userId:9, email:"artist2@example.com", password:"artistpass456", role:"artist" },
];

async function hashPasswords(users) {
  for (let user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed; 
  }
  console.log(users);
}

hashPasswords(users);
