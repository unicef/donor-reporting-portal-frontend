import { FORM_CONFIG } from 'lib/constants';
import { selectDonorDocuments } from 'selectors/collections';
import DropdownFilterFactory from '../lib/filters-factory';

export default DropdownFilterFactory(selectDonorDocuments, FORM_CONFIG.donorDocument.label);
