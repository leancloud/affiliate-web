import React from 'react';
import OriginalGriddle from 'griddle-react';
import { Pager } from './Pager';

/* component styles */
import { styles } from './styles.scss';


export const Griddle = (props) =>
  <OriginalGriddle
    gridClassName={`${styles}`}
    showTableHeading={false}
    resultsPerPage={10}
    useGriddleStyles={false}
    useCustomPagerComponent="true"
    customPagerComponent={Pager}
    {...props}
  />;
