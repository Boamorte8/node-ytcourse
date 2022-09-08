import { Type } from '@sinclair/typebox';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';

// This is the schema with JSON Schema structure
// const LoginDTOSchema = {
//   type: 'object',
//   properties: {
//     email: {
//       type: 'string',
//       format: 'email',
//     },
//     password: {
//       type: 'string',
//       format: 'password',
//     },
//   },
//   required: ['email', 'password'],
//   additionalProperties: false,
// }

const LoginDTOSchema = Type.Object(
  {
    email: Type.String({
      format: 'email',
      errorMessage: {
        type: 'Email must be a string',
        format: 'Email must be a valid email address',
      },
    }),
    password: Type.String({
      errorMessage: {
        type: 'Password must be a string',
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'Body must NOT have additional properties',
    },
  }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ['email']);
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validate.errors, { separator: '\n' }));

  // This is the manual way to validate the login data
  // if (typeof loginDto !== 'object')
  //   return res.status(400).send('Body does not has right structure');

  // const bodyPropertyNames = Object.keys(loginDto);

  // const checkProperties =
  //   DTO_PROPERTY_NAMES.length === bodyPropertyNames.length &&
  //   bodyPropertyNames.every((propertyName) =>
  //     DTO_PROPERTY_NAMES.includes(propertyName)
  //   );

  // if (!checkProperties)
  //   return res
  //     .status(400)
  //     .send('Body must has only email and password properties');

  next();
};

export default validateLoginDTO;
