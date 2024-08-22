import React, { useState, useRef } from 'react';
import useFetchApi from '../../hooks/useFetchApi';
import useDeleteApi from '../../hooks/useDeleteApi';
import EditContact from './EditContact';
import ConfirmDialog from './ConfirmDialog';
import Placeholder from '../placeholders/Placeholder';

function Contacts() {
  const { data: contacts, loading, refetchApi, setData } = useFetchApi({ url: '/contact' });
  const { handleDelete, deleting } = useDeleteApi({ url: '/contact' });
  const shouldUpdateRef = useRef(true);
  const [contactSelected, setContactSelected] = useState({
    NAME: '',
    LAST_NAME: '',
    EMAIL: [],
    PHONE: [],
    WEB: [],
  });

  const onDeleteContact = async (contactId) => {
    await handleDelete({ contactId });
    setData((prev) => prev.filter((contact) => contact.ID !== contactId));
  };

  const onSelectContact = (id) => {
    setContactSelected(contacts.find((contact) => contact.ID === id));
    shouldUpdateRef.current = true;
  };

  const onCreateContact = () => {
    setContactSelected({});
    shouldUpdateRef.current = true;
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
                  {contact.EMAIL?.map((element) => (
                    <p className="text-muted mb-0">{element.VALUE}</p>
                  ))}
                </td>
                <td colSpan={2}>
                  {contact.address?.map((element) => (
                    <div>
                      <p className="fw-normal mb-1">
                        {[element.ADDRESS_1, element.REGION, element.CITY]
                          .filter((element) => element !== undefined && element !== null)
                          .join(', ')}
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {contact.PHONE?.map((element) => (
                    <div>{element.VALUE}</div>
                  ))}
                </td>
                <td>
                  {contact.WEB?.map((element) => (
                    <div>{element.VALUE}</div>
                  ))}
                </td>
                <td>
                  {contact.bankInfo?.map((element) => (
                    <div>
                      <p className="fw-normal mb-1">{element.RQ_ACC_NUM}</p>
                      <p className="text-muted mb-0">{element.RQ_BANK_NAME}</p>
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
                    disabled={deleting}
                  >
                    {deleting ? (
                      <div className="spinner-border text-light spinner-border-sm" role="status"></div>
                    ) : (
                      <i className="fa-solid fa-trash"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <EditContact contact={contactSelected} setContact={setContactSelected} shouldUpdateRef={shouldUpdateRef} />
      {contactSelected && <ConfirmDialog contact={contactSelected} onDeleteContact={onDeleteContact} />}
    </div>
  );
}

export default Contacts;
