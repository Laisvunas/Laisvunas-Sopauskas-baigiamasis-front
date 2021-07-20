import React from 'react';
import Input from './Input';

export default {
    title: 'Input',
    component: Input
};

export const Text = () => <Input type="text" label="Name" placeholder="Name" minLength="2" />;

export const Email = () => <Input type="email" label="Email" placeholder="name@gmail.com" />;

export const Password = () => <Input type="password" label="Password" placeholder="Password" />;