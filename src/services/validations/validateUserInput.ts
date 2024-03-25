import schemas from './schema';

type InputProduct = {
  name: string;
  price: string;
  userId: number;
};

function validateUser(input: InputProduct) : { status: number, message: string } | undefined {
  const { error } = schemas.productSchema.validate(input);
  if (error?.details[0].type === 'string.min') {
    return { status: 422, message: error.message };
  }
  if (error) {
    return { status: 400, message: error.message };
  }
}

export default validateUser;