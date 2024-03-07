import React from 'react';
import { Text, StyleSheet } from 'react-native';

type ModalTitleProps = {
    title: string;
};

const ModalTitle: React.FC<ModalTitleProps> = ({ title }) => (
    <Text style={styles.title}>{title}</Text>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
});

export default ModalTitle;
