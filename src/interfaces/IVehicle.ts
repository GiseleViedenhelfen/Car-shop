import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'modelo é obrigatório',
    invalid_type_error: 'modelo precisa ser uma string',
  }).min(3, { message: 'model precisa de pelo menos 3 caracteres' }),

  year: z.number({
    required_error: 'ano é obrigatório',
    invalid_type_error: 'ano precisa ser um número inteiro positivo',
  }).int().positive()
    .gte(1900, { message: 'ano deve ser maior ou igual a 1900' })
    .lte(2022, { message: 'ano deve ser menor ou igual a 2022' }),

  color: z.string({
    required_error: 'cor é obrigatório',
    invalid_type_error: 'cor precisa ser uma string',
  }).min(3, { message: 'cor precisa de pelo menos 3 caracteres' }),

  status: z.boolean().optional(),

  buyValue: z.number({
    required_error: 'preço é obrigatório',
    invalid_type_error: 'preço precisa ser  um número',
  }).int(),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema };