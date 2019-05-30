import { pathOr, pipe, trim } from 'ramda';

export const getInputValue =  pipe(
    pathOr('', ['target', 'value']),
    trim
);