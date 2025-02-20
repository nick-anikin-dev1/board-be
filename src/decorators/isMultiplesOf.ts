import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsMultiplesOf(
  multipleOf: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsMultiplesOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [multipleOf],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'number' && value % multipleOf === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a multiple of ${multipleOf}`;
        },
      },
    });
  };
}
