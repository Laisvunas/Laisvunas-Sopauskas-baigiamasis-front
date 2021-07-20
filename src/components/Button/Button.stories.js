import React from 'react';
import Button from './Button';

export default {
    title: 'Button',
    component: Button
};

export const Primary = () => <Button variant='is-primary'>Primary</Button>;

export const Outline = () => <Button>Outline</Button>;