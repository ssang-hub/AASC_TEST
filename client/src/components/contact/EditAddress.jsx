import style from './style.module.scss';
import { addressTypesValue } from '../../const/default';

function EditAddress({ addressData, onChangeContactData, setUniqueAddress, uniqueAddress }) {
  const handleUpdateAddressTypeId = (addressData, value) => {
    onChangeContactData({
      action: 'update',
      fieldName: 'address',
      fieldId: addressData.ID,
      data: { TYPE_ID: value },
    });
  };

  const handleDeleteAddress = (TYPE_ID, ID) => {
    setUniqueAddress((prev) => prev.filter((item) => item !== TYPE_ID));
    onChangeContactData({ action: 'delete', fieldName: 'address', fieldId: ID });
  };

  return (
    <div>
      <td>
        <select
          className="form-control"
          value={addressData.TYPE_ID}
          onChange={(e) => handleUpdateAddressTypeId(addressData, e.target.value)}
        >
          {addressTypesValue.map((option, index) => (
            <option
              key={index}
              className="dropdown-item"
              disabled={addressData.TYPE_ID === option.TYPE_ID || uniqueAddress.includes(option.TYPE_ID)}
              value={option.TYPE_ID}
            >
              {option.VALUE}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            onChangeContactData({
              action: 'update',
              fieldName: 'address',
              fieldId: addressData.ID,
              data: { CITY: e.target.value },
            })
          }
          value={addressData.CITY || ''}
          placeholder="city"
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            onChangeContactData({
              action: 'update',
              fieldName: 'address',
              fieldId: addressData.ID,
              data: { REGION: e.target.value },
            })
          }
          value={addressData.REGION || ''}
          placeholder="district"
        />
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          onChange={(e) =>
            onChangeContactData({
              action: 'update',
              fieldName: 'address',
              fieldId: addressData.ID,
              data: { ADDRESS_1: e.target.value },
            })
          }
          value={addressData.ADDRESS_1 || ''}
          placeholder="street"
        />
      </td>

      <td>
        <div className={`btn ${style['btn-add-data']}`} onClick={() => handleDeleteAddress(addressData.TYPE_ID, addressData.ID)}>
          <i className="fa-solid fa-trash text-info"></i>
        </div>
      </td>
    </div>
  );
}

export default EditAddress;
