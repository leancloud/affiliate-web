import React from 'react';

export const Pager = (props) => {
  if (props.maxPage <= 1) {
    return <div></div>;
  }

  let previous = '';
  let next = '';

  if (props.currentPage > 0) {
    previous = <span onClick={props.previous} className="previous">◄</span>;
  }
  if (props.currentPage !== (props.maxPage - 1)) {
    next = <span onClick={props.next} className="next">►</span>;
  }

  return (
    <div className="pager">
      {previous}
      <span className="current">{props.currentPage + 1}</span>
      {next}
    </div>
  );
};
Pager.propTypes = {
  maxPage: React.PropTypes.number,
  currentPage: React.PropTypes.number,
  previous: React.PropTypes.func,
  next: React.PropTypes.func,
};
