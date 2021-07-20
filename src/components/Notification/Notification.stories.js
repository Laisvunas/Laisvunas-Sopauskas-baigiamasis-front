import React from 'react';
import Notification from './Notification';

export default {
    title: 'Notification',
    component: Notification
};

export const Success = () => <Notification variant='is-success' text="Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur." />;

export const Danger = () => <Notification variant='is-danger' text="Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor. Pellentesque risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis venenatis efficitur." />;
