import React, { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';

const ContactContext = createContext();

export const useContact = () => {
    return useContext(ContactContext);
};

export function ContactProvider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    const submitContact = async (formData) => {
        try {
            setLoading(true);
            console.log('Submitting contact form:', formData);
            const res = await axios.post('/contact', formData);
            console.log('Contact form response:', res.data);
            toast.success(res.data.message);
            return res.data.contact;
        } catch (error) {
            console.error('Contact form error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to send message';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getContacts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/contact');
            setContacts(res.data.contacts);
            return res.data.contacts;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch contacts';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateContactStatus = async (id, status) => {
        try {
            setLoading(true);
            const res = await axios.put(`/contact/${id}`, { status });
            setContacts(prev => 
                prev.map(contact => 
                    contact._id === id ? res.data.contact : contact
                )
            );
            toast.success(res.data.message);
            return res.data.contact;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update contact';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (id) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/contact/${id}`);
            setContacts(prev => prev.filter(contact => contact._id !== id));
            toast.success(res.data.message);
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete contact';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        contacts,
        loading,
        submitContact,
        getContacts,
        updateContactStatus,
        deleteContact
    };

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}
