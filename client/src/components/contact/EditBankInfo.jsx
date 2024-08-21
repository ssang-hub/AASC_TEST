import style from './style.module.scss';

const EditBankInfo = ({ onChangeContactData, bankInfo }) => {
  return (
    <div>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Bank Name"
          onChange={(e) =>
            onChangeContactData({
              action: 'update',
              fieldName: 'bankInfo',
              fieldId: bankInfo.ID,
              data: { RQ_BANK_NAME: e.target.value },
            })
          }
          value={bankInfo.RQ_BANK_NAME}
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Account Number"
          onChange={(e) =>
            onChangeContactData({
              action: 'update',
              fieldName: 'bankInfo',
              fieldId: bankInfo.ID,
              data: { RQ_ACC_NUM: e.target.value },
            })
          }
          value={bankInfo.RQ_ACC_NUM}
        />
      </td>
      <td>
        <div
          className={`btn ${style['btn-add-data']}`}
          onClick={() => onChangeContactData({ action: 'delete', fieldName: 'bankInfo', fieldId: bankInfo.ID })}
        >
          <i className="fa-solid fa-trash text-info"></i>
        </div>
      </td>
    </div>
  );
};

export default EditBankInfo;
