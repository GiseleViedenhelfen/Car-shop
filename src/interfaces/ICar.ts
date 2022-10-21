import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'quantidade de portas é obrigatório',
    invalid_type_error: 'quantidade de portas precisa ser um número',
  }).positive()
    .gte(2, { message: 'mínimo 2 portas' })
    .lte(4, { message: 'máximo 4 portas' }),

  seatsQty: z.number({
    required_error: 'quantidade de assentos é obrigatório',
    invalid_type_error: 'quantidade de assentos precisa ser um número',
  }).positive()
    .gte(2, { message: 'mínimo 2 assentos' })
    .lte(7, { message: 'máximo 7 assentos' }),
});

export type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema };