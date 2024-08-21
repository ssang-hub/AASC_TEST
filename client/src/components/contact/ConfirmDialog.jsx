import React from 'react';
import style from './style.module.scss';

function ConfirmDialog({ contact, onDeleteContact }) {
  return (
    <div
      className="modal fade"
      id="deleteContact"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="deleteContactLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteContactLabel">
              Delete Contact
            </h5>
          </div>
          <div className="modal-body">Do you want to delete this contact?</div>
          <div className={`${style['modal-footer-wrap']} modal-footer`}>
            <button
              type="button"
              className={`${style.btnDelete} btn btn-secondary btn-delete-dialog  rounded-pill`}
              data-dismiss="modal"
            >
              Close
            </button>

            <button
              type="button"
              className={`${style.btnDelete} btn btn-danger btn-delete-dialog  rounded-pill`}
              data-dismiss="modal"
              onClick={() => onDeleteContact(contact.ID)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmDialog;
