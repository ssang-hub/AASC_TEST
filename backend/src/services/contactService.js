import intersectionBy from 'lodash/intersectionBy';
import differenceBy from 'lodash/differenceBy';
import { api } from '../helpers/api';
export const handleDataUpdateContact = async (newBankAccountInfo, newAccountAddress, requisiteId) => {
  const [bankInfo, address] = await Promise.all([
    api('crm.requisite.bankdetail.list', { body: { filter: { ENTITY_ID: requisiteId }, select: ['ID'] } }),
    api('crm.address.list', { body: { filter: { ENTITY_ID: requisiteId, ENTITY_TYPE_ID: 8 }, select: ['TYPE_ID'] } }),
  ]);
  if (bankInfo) {
    const commonElements = intersectionBy(newBankAccountInfo, bankInfo, 'ID');
    const arr1NotInArr2 = differenceBy(bankInfo, newBankAccountInfo, 'ID');
    const arr2NotInArr1 = differenceBy(newBankAccountInfo, bankInfo, 'ID');
    console.log(commonElements, arr2NotInArr1, arr1NotInArr2);
    console.log(requisiteId);

    await Promise.all([
      ...commonElements.map((item) => api('crm.requisite.bankdetail.update', { body: { id: item.id, fields: { ...item } } })),
      ...arr1NotInArr2.map((item) => api('crm.requisite.bankdetail.delete', { body: { id: item.ID } })),
      ...arr2NotInArr1.map((item) =>
        api('crm.requisite.bankdetail.add', { body: { fields: { ENTITY_ID: requisiteId, NAME: 'Bank details', ...item } } }),
      ),
    ]);
  }
  if (address) {
    const commonElements = intersectionBy(newAccountAddress, address, 'TYPE_ID');
    const arr1NotInArr2 = differenceBy(address, newAccountAddress, 'TYPE_ID');
    const arr2NotInArr1 = differenceBy(newAccountAddress, address, 'TYPE_ID');

    await Promise.all([
      ...commonElements.map((item) =>
        api('crm.address.update', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, ...item } } }),
      ),
      ...arr1NotInArr2.map((item) =>
        api('crm.address.delete', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, TYPE_ID: item.TYPE_ID } } }),
      ),
      ...arr2NotInArr1.map((item) =>
        api('crm.address.add', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, ...item } } }),
      ),
    ]);
  }
};
