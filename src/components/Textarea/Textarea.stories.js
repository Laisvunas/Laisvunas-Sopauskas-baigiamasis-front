import React from 'react';
import Textarea from './Textarea';

export default {
    title: 'Textarea',
    component: Textarea
};

export const SimpleTextarea = () => <Textarea label="Commentary" placeholder="Commentary" rows={10} />;