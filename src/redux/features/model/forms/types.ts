import { EntityState } from '@reduxjs/toolkit';
import { Forms } from '../../../../interfaces/db_models/formsModels';

export interface FormssState extends EntityState<Forms, number> {}