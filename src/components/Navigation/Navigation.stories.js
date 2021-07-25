import React from 'react';
import Navigation from './Navigation';

export default {
    title: 'Navigation',
    component: Navigation
};

export const LeftNav = () => <aside className="column is-3 aside hero is-fullheight"><Navigation userName="Jonas" activeUrl="/diagrams"></Navigation></aside>;