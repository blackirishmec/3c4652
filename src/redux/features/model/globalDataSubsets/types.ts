import type { GlobalDataSubset } from '@/interfaces/models/globalDataModels';
import type { EntityState } from '@reduxjs/toolkit';

export interface GlobalDataSubsetsState
	extends EntityState<GlobalDataSubset, GlobalDataSubset['id']> {}
