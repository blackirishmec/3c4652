import type { Edge } from '@/interfaces/models/edgeModels';
import type { EntityState } from '@reduxjs/toolkit';

export interface EdgesState extends EntityState<Edge, Edge['id']> {}
