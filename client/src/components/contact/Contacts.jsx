import React, { useState } from 'react';
import useFetchApi from '../../hooks/useFetchApi';
import useDeleteApi from '../../hooks/useDeleteApi';
import EditContact from './EditContact';
import ConfirmDialog from './ConfirmDialog';
import Placeholder from '../placeholders/Placeholder';

function Contacts() {
  const { data: contacts, loading, refetchApi, setData } = useFetchApi({ url: '/contact' });
  const { handleDelete } = useDeleteApi({ url: '/contact' });
  const [contactSelected, setContactSelected] = useState({
    NAME: '',
    LAST_NAME: '',
    EMAIL: [],
    PHONE: [],
    WEB: [],
  });

  const onDeleteContact = async (contactId) => {
    await handleDelete({ contactId });
    setData((prev) => prev.filter((item) => item.ID !== contactId));
  };

  const onSelectContact = (id) => {
    setContactSelected(contacts.find((contact) => contact.ID === id));
  };

  const onCreateContact = () => {
    setContactSelected({});
  };

  return (
    <div className="container mt-4">
      <button
        type="button"
        className="btn btn-outline-success mx-2"
        onClick={() => onCreateContact()}
        data-toggle="modal"
        data-target="#editContact"
      >
        Create
      </button>
      <button type="button" disabled={loading} className="btn btn-outline-success mx-2" onClick={() => refetchApi()}>
        Refresh
      </button>
      <table className="table table-hover align-middle mb-0 bg-white mt-3">
        <thead className="bg-light">
          <tr>
            <th scope="col">Name</th>
            <th colSpan={2} scope="col">
              Address
            </th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Bank Detail</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7}>
                <Placeholder />
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact.ID}>
                <td>
                  <p className="fw-normal mb-1">
                    {contact.NAME} {contact.LAST_NAME}
                  </p>
                  {contact.EMAIL?.map((item) => (
                    <p className="text-muted mb-0">{item.VALUE}</p>
                  ))}
                </td>
                <td colSpan={2}>
                  {contact.address?.map((item) => (
                    <div>
                      <p className="fw-normal mb-1">
                        {[item.ADDRESS_1, item.REGION, item.CITY]
                          .filter((item) => item !== undefined && item !== null)
                          .join(', ')}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {contact.PHONE?.map((item) => (
                    <div>{item.VALUE}</div>
                  ))}
                </td>
                <td>
                  {contact.WEB?.map((item) => (
                    <div>{item.VALUE}</div>
                  ))}
                </td>
                <td>
                  {contact.bankInfo?.map((item) => (
                    <div>
                      <p className="fw-normal mb-1">{item.RQ_ACC_NUM}</p>
                      <p className="text-muted mb-0">{item.RQ_BANK_NAME}</p>
                    </div>
                  ))}
                </td>

                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded btn-primary mr-3"
                    onClick={() => onSelectContact(contact.ID)}
                    data-toggle="modal"
                    data-target="#editContact"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded btn-danger"
                    data-toggle="modal"
                    data-target="#deleteContact"
                    onClick={() => onSelectContact(contact.ID)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <EditContact contact={contactSelected} setContact={setContactSelected} />
      {contactSelected && <ConfirmDialog contact={contactSelected} onDeleteContact={onDeleteContact} />}
    </div>
  );
}

export default Contacts;
