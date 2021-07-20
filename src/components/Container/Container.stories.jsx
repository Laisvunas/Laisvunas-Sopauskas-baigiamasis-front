import React from 'react';
import Container from './Container';

export default {
    title: 'Container',
    component: Container
};

export const Medium = () => <Container>This text is in container. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, qui? Beatae eligendi dignissimos illum excepturi vel similique harum? Laboriosam, corporis? Autem quae reiciendis perferendis nisi quasi ipsam eius mollitia temporibus!</Container>;

export const Wide = () => <Container variant="wide">This text is in container. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, qui? Beatae eligendi dignissimos illum excepturi vel similique harum? Laboriosam, corporis? Autem quae reiciendis perferendis nisi quasi ipsam eius mollitia temporibus!</Container>;

export const Padded = () => <Container variant="padded">This text is in container. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, qui? Beatae eligendi dignissimos illum excepturi vel similique harum? Laboriosam, corporis? Autem quae reiciendis perferendis nisi quasi ipsam eius mollitia temporibus!</Container>;