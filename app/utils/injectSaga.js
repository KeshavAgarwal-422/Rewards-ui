import { injectSaga } from '@capillarytech/vulcan-react-sdk/utils';
import { DAEMON } from '@capillarytech/vulcan-react-sdk/utils/sagaInjectorTypes';
export default (props) => injectSaga({ ...props, mode: DAEMON });
