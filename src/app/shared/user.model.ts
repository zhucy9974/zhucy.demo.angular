export class User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  username?: string;
  email?: string;
  address?: {
    fullAddresse?: string;
    street: string,
    suite?: string,
    city: string,
    zipcode: string,
    geo?: {
      lat: string,
      lng: string,
    }
  };
  phone?: string;
  website?: string;
  company?: {
    name: string,
    catchPhrase: string,
    bs: string,
  };

  public static newUser():User{
    const user:User = new User();
    user.address = {
      fullAddresse: null,
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      geo: {
        lat: null,
        lng: null,
      }
    };
    user.company = {
      name: null,
      catchPhrase: null,
      bs: null,
    };
    return user;
  }
}
