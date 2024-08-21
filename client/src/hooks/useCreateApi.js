import {useState} from 'react';
import {api} from '../helpers/api';
import {showNotification} from "../helpers/notification";

/**
 * @param url
 * @returns {{creating: boolean, handleCreate}}
 */
export default function useCreateApi({url}) {
    const [creating, setCreating] = useState(false);

    const handleCreate = async (data) => {
        try {
            setCreating(true);
            const resp = await api(url, {body: {data}, method: 'POST'});
            showNotification('Creation success', true)
        } catch (e) {
            showNotification('Creation failed', false)
        } finally {
            setCreating(false);
        }
    };

    return {creating, handleCreate};
}
