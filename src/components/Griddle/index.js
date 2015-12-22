import React, { Component } from 'react';
import OriginalGriddle from 'griddle-react';

/* component styles */
import styles from './styles';

const Pager = (props) => {
  if (props.maxPage <= 1) {
    return <div></div>;
  }

  var previous = "";
  var next = "";

  if(props.currentPage > 0){
      previous = <span onClick={props.previous} className="previous">◄</span>
  }
  if(props.currentPage != (props.maxPage -1)){
      next = <span onClick={props.next} className="next">►</span>
  }

  return (
    <div className="pager">
      {previous}
      <span className="current">{props.currentPage + 1}</span>
      {next}
    </div>
  )
}

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
