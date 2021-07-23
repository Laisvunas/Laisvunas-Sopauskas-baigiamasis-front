import React from 'react';
import Button from './Button';

export default {
    title: 'Button',
    component: Button
};

export const Primary = () => <Button variant='is-primary'>Primary</Button>;

export const Danger = () => <Button variant='is-danger'>Danger</Button>;