import type { Node } from '@/interfaces/models/nodeModels';
import type { EntityState } from '@reduxjs/toolkit';

export interface NodesState extends EntityState<Node, Node['id']> {}
