import { entitiesReducer } from 'wild-magix';
import { EntitiesState } from 'wild-magix/lib/reducers/entities';

export interface RootState {
  entitites?: EntitiesState;
}

export default {
  entities: entitiesReducer,
};
