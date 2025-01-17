import { faker } from '@faker-js/faker';

export default {
  putUsuario: function () {
    const data = [
      {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: "true"
      }
    ];

    return data;
  }
};