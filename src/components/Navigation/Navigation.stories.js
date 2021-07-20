import React from 'react';
import Navigation from './Navigation';

export default {
    title: 'Navigation',
    component: Navigation
};

export const LeftNav = () => <Navigation userName="Jonas" activeUrl="/diagrams"></Navigation>;