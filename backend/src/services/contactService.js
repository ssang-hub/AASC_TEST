import intersectionBy from 'lodash/intersectionBy';
import differenceBy from 'lodash/differenceBy';
import { api } from '../helpers/api';

/**
 * @param bankInfo
 * @param address
 * @param requisiteId
 */
export const handleDataUpdateContact = async (bankInfo, address, requisiteId) => {
  const [oldBankInfo, oldAddress] = await Promise.all([
    api('crm.requisite.bankdetail.list', { body: { filter: { ENTITY_ID: requisiteId }, select: ['ID'] } }),
    api('crm.address.list', { body: { filter: { ENTITY_ID: requisiteId, ENTITY_TYPE_ID: 8 }, select: ['TYPE_ID'] } }),
  ]);
  if (oldBankInfo) {
    const updateElements = intersectionBy(bankInfo, oldBankInfo, 'ID');
    const deleteElements = differenceBy(oldBankInfo, bankInfo, 'ID');
    const createElements = differenceBy(bankInfo, oldBankInfo, 'ID');
    await Promise.all([
      ...updateElements.map((element) =>
        api('crm.requisite.bankdetail.update', { body: { id: element.ID, fields: { ...element } } }),
      ),
      ...deleteElements.map((element) => api('crm.requisite.bankdetail.delete', { body: { id: element.ID } })),
      ...createElements.map((element) =>
        api('crm.requisite.bankdetail.add', { body: { fields: { ENTITY_ID: requisiteId, NAME: 'Bank details', ...element } } }),
      ),
    ]);
  }
  if (oldAddress) {
    const updateElements = intersectionBy(address, oldAddress, 'TYPE_ID');
    const deleteElements = differenceBy(oldAddress, address, 'TYPE_ID');
    const createElements = differenceBy(address, oldAddress, 'TYPE_ID');

    await Promise.all([
      ...updateElements.map((element) =>
        api('crm.address.update', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, ...element } } }),
      ),
      ...deleteElements.map((element) =>
        api('crm.address.delete', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, TYPE_ID: element.TYPE_ID } } }),
      ),
      ...createElements.map((element) =>
        api('crm.address.add', { body: { fields: { ENTITY_TYPE_ID: 8, ENTITY_ID: requisiteId, ...element } } }),
      ),
    ]);
  }
};
