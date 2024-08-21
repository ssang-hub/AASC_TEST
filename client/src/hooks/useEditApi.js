import { useState } from 'react';
import { api } from '../helpers/api';
import { showNotification } from '../helpers/notification';

/**
 * @param url
 * @returns {{editing: boolean, handleEdit}}
 */
export default function useEditApi({ url }) {
  const [editing, setEditing] = useState(false);

  const handleEdit = async (data) => {
    try {
      setEditing(true);
      await api(url, { body: { data }, method: 'PUT' });
      showNotification('update success', true);
    } catch (e) {
      showNotification('update failed', false);
    } finally {
      setEditing(false);
    }
  };

  return { editing, handleEdit };
}
