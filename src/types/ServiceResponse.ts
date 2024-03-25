type DataError = { message: string };
type LoginSuccess = { token: string };

type ServiceResponse<T> = {
  status: number;
  data: DataError | LoginSuccess | T | T[];
};

export default ServiceResponse;