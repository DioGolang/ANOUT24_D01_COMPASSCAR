class UserResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }

  toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name
    };
  }
}
module.exports = UserResponseDTO;
