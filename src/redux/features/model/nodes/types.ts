import { EntityState } from '@reduxjs/toolkit';
import { Nodes } from '../../../../interfaces/db_models/nodesModels';

export interface NodessState extends EntityState<Nodes, number> {}