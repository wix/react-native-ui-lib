import SortableList, {SortableListProps} from './SortableList';
import {asBaseComponent} from '../../commons/new';

export {SortableListProps} from './SortableList';
export default asBaseComponent<SortableListProps<any>>(SortableList);
