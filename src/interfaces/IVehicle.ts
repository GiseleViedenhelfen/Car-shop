import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'model precisa de pelo menos 3 caracteres' }),
  year: z.number().int().positive()
    .lte(1900, { message: 'ano deve ser maior ou igual a 1900' })
    .gte(2022, { message: 'ano deve ser menor ou igual a 2022' }),
  color: z.string().min(3, { message: 'model precisa de pelo menos 3 caracteres' }),
  status: z.boolean().optional(),
  buyValue: z.number().positive().gte(
    3,
    { message: 'valor de compra deve ter apenas 2 números inteiros' },
  ),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema };