export const contactFields = [
  { title: 'Email', fieldName: 'EMAIL', options: ['Work', 'Home', 'For newsletters', 'Other'] },
  {
    title: 'Website',
    fieldName: 'WEB',
    options: ['Corporate', 'Personal', 'Facebook', 'VK', 'LiveJour...', 'Twitter', 'Other'],
  },
  {
    title: 'Phone',
    fieldName: 'PHONE',
    options: ['Work Phone', 'Mobile', 'Fax', 'Home', 'Pager', 'SMS manager', 'Other'],
  },
];
export const addressTypesValue = [
  { TYPE_ID: '11', VALUE: 'Delivery address' },
  { TYPE_ID: '1', VALUE: 'Street address' },
  { TYPE_ID: '6', VALUE: 'Legal address' },
  { TYPE_ID: '4', VALUE: 'Registered address' },
  { TYPE_ID: '9', VALUE: 'Beneficiary address' },
];
export const defaultContactField = {
  NAME: '',
  LAST_NAME: '',
  EMAIL: { VALUE_TYPE: 'Work', VALUE: '' },
  WEB: { VALUE_TYPE: 'Corporate', VALUE: '' },
  PHONE: { VALUE_TYPE: 'Work Phone', VALUE: '' },
  address: { CITY: '', ADDRESS_1: '', REGION: '' },
  bankInfo: { RQ_BANK_NAME: '', RQ_ACC_NUM: '' },
};
