import { z } from 'zod';
import { createTransactionSchema } from './create-transaction-schema';

export const editTransactionSchema = createTransactionSchema;

export type EditTransactionSchema = z.infer<typeof editTransactionSchema>;
