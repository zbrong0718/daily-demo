/**
 * athor: wang
 */
/**
 * Get an array from a specified range
 * @param  {Number} start [start of the range]
 * @param  {Number} end   [end of the range]
 * @param  {Number} step  [step of the range]
 * @return {Array}        [range array]
 */
 function range(start, end, step) {
  let len, diff;
  start = isNaN(start) ? 0 : start;
  step = isNaN(step) ? 1 : step;
  if ( isNaN(end) ) {
    end = start;
    start = 0;
  }
  diff = end - start;
  len = Math.ceil(diff / step);
  return Array(len).fill(start).map( (e, i)=> e + i * step );
}
/**
 * genaration an mitiplicationTable
 * @param  {Boolean}  isFull  [determines table's style]
 * @return {Array}            [mitiplication table array]
 */
 function mitiplicationTable(isFull) {
  return range(1,10).map( i => (
    range(1, isFull ? 10 : i + 1 ).map(
      j => `${i}*${j}=${i*j}`
      )
    ) );
}

/**
 * convert a table array to a tab-separated string
 * @param  {Array} table [an two-dimensional array]
 * @return {String}       []
 */
 function tableToString(table, sep='\t') {
  table = Array.isArray(table) ? table : [];
  return table.map( cell=> cell.join(sep) ).join('\n');
}