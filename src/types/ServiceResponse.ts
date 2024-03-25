type DataError = { message: string };
type LoginSuccess = { token: string };
type UserList = { username: string; productIds: number[] };

type ServiceResponse<T> = {
  status: number;
  data: DataError | LoginSuccess | T | T[] | UserList[];
};

export default ServiceResponse;