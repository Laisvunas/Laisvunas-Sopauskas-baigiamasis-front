import React from 'react';
import ProgressBar from './ProgressBar';

export default {
    title: 'ProgressBar',
    component: ProgressBar
};

export const Indeterminate = () => <ProgressBar size="is-small" variant='is-primary'></ProgressBar>;
