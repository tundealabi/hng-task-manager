import { DateTime } from 'luxon';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDueDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidDueDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Parse the date using Luxon
          const date = DateTime.fromISO(value, { setZone: true });

          // Check if the date is valid and not in the past
          const isValidDate =
            date.isValid && date >= DateTime.now().startOf('day');

          return isValidDate;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid date in 'YYYY-MM-DD' format and not in the past`;
        },
      },
    });
  };
}
