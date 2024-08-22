import React, { useEffect, useState } from 'react';
import useCreateApi from '../../hooks/useCreateApi';
import useEditApi from '../../hooks/useEditApi';
import EditAddress from './EditAddress';
import EditBankInfo from './EditBankInfo';

import { contactFields, addressTypesValue, defaultContactField } from '../../const/default';
import style from './style.module.scss';
import { v4 as uuidv4 } from 'uuid';

function EditContact({ contact = { NAME: '', LAST_NAME: '', EMAIL: [] }, setContact, shouldUpdateRef }) {
  const [uniqueAddress, setUniqueAddress] = useState(contact.address?.map((address) => address.TYPE_ID) || []);
  const { handleCreate, creating } = useCreateApi({ url: '/contact' });
  const { handleEdit, editing } = useEditApi({ url: '/contact' });

  useEffect(() => {
    if (shouldUpdateRef.current) {
      setUniqueAddress(contact.address?.map((address) => address.TYPE_ID) || []);
      shouldUpdateRef.current = false;
    }
  }, [contact]);

  /**
   * @param {string} action
   * @param {string} fieldName
   * @param {string} fieldId
   * @param {object} data
   */
  const onChangeContactData = ({ action = 'add', fieldName, fieldId = '', data = {} }) => {
    if (action === 'add') {
      setContact((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] || []), { ID: uuidv4(), ...data, ...defaultContactField[fieldName] }],
      }));
    } else if (action === 'update') {
      if (fieldName === 'NAME' || fieldName === 'LAST_NAME') {
        setContact((prev) => ({ ...prev, ...data }));
      } else
        setContact((prev) => ({
          ...prev,
          [fieldName]: prev[fieldName].map((fieldElement) =>
            fieldElement.ID === fieldId ? { ...fieldElement, ...data } : fieldElement,
          ),
        }));
    } else if (action === 'delete') {
      setContact((prev) => ({ ...prev, [fieldName]: prev[fieldName].filter((fieldElement) => fieldElement.ID !== fieldId) }));
    }
  };

  const onSubmitContact = () => {
    contact.ID ? handleEdit(contact) : handleCreate(contact);
  };

  const handleAddAddress = () => {
    for (let addressType of addressTypesValue) {
      if (!uniqueAddress.includes(addressType.TYPE_ID)) {
        onChangeContactData({ action: 'add', fieldName: 'address', data: { TYPE_ID: addressType.TYPE_ID } });
        setUniqueAddress((perv) => [...perv, addressType.TYPE_ID]);
        break;
      }
    }
  };

  const contactElement = (contact, element) => {
    return contact[element.fieldName]?.map((fieldData) => (
      <div>
        <td className="form-outline">
          <input
            type="text"
            className="form-control"
            defaultValue={fieldData.VALUE}
            onChange={(e) =>
              onChangeContactData({
                action: 'update',
                fieldName: element.fieldName,
                fieldId: fieldData.ID,
                data: { VALUE: e.target.value },
              })
            }
          />
        </td>
        <td>
          <select
            className="form-control"
            value={fieldData.VALUE_TYPE || ''}
            onChange={(e) =>
              onChangeContactData({
                action: 'update',
                fieldName: element.fieldName,
                fieldId: fieldData.ID,
                data: { VALUE_TYPE: e.target.value },
              })
            }
          >
            {element.options.map((option) => (
              <option className="dropdown-item" value={option} href="#">
                {option}
              </option>
            ))}
          </select>
        </td>
        <td>
          <div
            className={`btn ${style['btn-add-data']}`}
            onClick={() => onChangeContactData({ action: 'delete', fieldName: element.fieldName, fieldId: fieldData.ID })}
          >
            <i className="fa-solid fa-trash text-info"></i>
          </div>
        </td>
      </div>
    ));
  };

  return (
    <div
      className="modal fade "
      id="editContact"
      data-backdrop="static"
      x
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editContactLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-right">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editContactLabel">
              Contact infomation
            </h5>
          </div>
          <div className="modal-body">
            <div className="modal-body">
              <img
                className="avatar rounded-circle border border-secondary"
                src={contact?.PHOTO || './default_person_avatar.png'}
                alt="avatar"
              />
              <h5 className="my-2">
                {contact.LAST_NAME} {contact.NAME}
              </h5>

              <table className="table" width={100}>
                <tbody>
                  <tr>
                    <th scope="row">Name:</th>
                    <td className="form-outline" colSpan={2}>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={contact.NAME}
                        onChange={(e) =>
                          onChangeContactData({ action: 'update', fieldName: 'NAME', data: { NAME: e.target.value } })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Last name:</th>
                    <td className="form-outline" colSpan={2}>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={contact.LAST_NAME}
                        onChange={(e) =>
                          onChangeContactData({ action: 'update', fieldName: 'LAST_NAME', data: { LAST_NAME: e.target.value } })
                        }
                      />
                    </td>
                  </tr>
                  {contactFields.map((element) => (
                    <tr>
                      <th scope="row">
                        <div>{element.title}</div>
                        <button
                          className={`btn ${style['btn-add-data']} ml-2`}
                          onClick={() =>
                            onChangeContactData({
                              action: 'add',
                              fieldName: element.fieldName,
                              data: { VALUE_TYPE: element.options[0] },
                            })
                          }
                        >
                          +
                        </button>
                      </th>
                      {contactElement(contact, element)}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row">
                      <div>Address</div>
                      <button
                        className={`btn ${style['btn-add-data']} ml-2`}
                        disabled={uniqueAddress.length === 5}
                        onClick={() => handleAddAddress()}
                      >
                        +
                      </button>
                    </th>
                    {contact.address?.map((address) =>
                      EditAddress({
                        addressData: address,
                        onChangeContactData,
                        setUniqueAddress,
                        uniqueAddress,
                        shouldUpdateRef: shouldUpdateRef,
                      }),
                    )}
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>Banking</div>
                      <button
                        className={`btn ${style['btn-add-data']} ml-2`}
                        onClick={() => onChangeContactData({ action: 'add', fieldName: 'bankInfo' })}
                      >
                        +
                      </button>
                    </th>
                    {contact.bankInfo?.map((bankInfo) => EditBankInfo({ onChangeContactData, bankInfo }))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              disabled={creating || editing}
              onClick={() => onSubmitContact()}
            >
              {creating || editing ? <div className="spinner-border text-info spinner-border-sm" role="status"></div> : 'Save'}
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditContact;
