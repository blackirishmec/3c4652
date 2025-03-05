import type { Form } from '@/interfaces/models/formModels';
import type { EntityState } from '@reduxjs/toolkit';

export interface FormsState extends EntityState<Form, Form['id']> {}
