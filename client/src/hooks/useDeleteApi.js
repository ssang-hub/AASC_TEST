import { useState } from 'react';
import { api } from '../helpers/api';
import { showNotification } from '../helpers/notification';

/**
 * @param url
 * @returns {{deleting: boolean, handleDelete}}
 */
export default function useDeleteApi({ url }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (data) => {
    try {
      setDeleting(true);
      await api(url, { body: { ...data }, method: 'DELETE' });
      showNotification('Delete success', true);
      return true;
    } catch (e) {
      showNotification('Delete failed', false);
    } finally {
      setDeleting(false);
    }
  };

  return { deleting, handleDelete };
}
