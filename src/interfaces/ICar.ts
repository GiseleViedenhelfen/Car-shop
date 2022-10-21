import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().positive()
    .lt(2, { message: 'mínimo 2 portas' })
    .gt(4, { message: 'máximo 4 portas' }),
  seatsQty: z.number().positive()
    .lt(2, { message: 'mínimo 2 assentos' })
    .gt(7, { message: 'máximo 7 assentos' }),
});

export type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema };