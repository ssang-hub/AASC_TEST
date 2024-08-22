import { api } from '../helpers/api';
import { handleDataUpdateContact } from '../services/contactService';
import { v4 as uuidv4 } from 'uuid';

/**
 * This is the example API for exercise 1
 * @param req
 * @param res
 * @return {Promise<any>}
 */
export const getAllContact = async (req, res) => {
  try {
    const contacts = await api('crm.contact.list', {
      body: {
        select: ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'WEB'],
      },
    });
    const contactIds = contacts.map((contact) => contact.ID);

    const [contactAddress, contactRequisites, contactBankDetail] = await Promise.all([
      api('crm.address.list', {
        body: {
          select: ['ADDRESS_1', 'REGION', 'CITY', 'ENTITY_ID', 'TYPE_ID'],
        },
      }),
      api('crm.requisite.list', {
        body: { filter: { ENTITY_ID: contactIds, ENTITY_TYPE_ID: 3 }, select: ['ID', 'ENTITY_ID'] },
      }),
      api('crm.requisite.bankdetail.list', {
        body: {
          select: ['RQ_BANK_NAME', 'RQ_ACC_NUM', 'ENTITY_ID', 'ID'],
        },
      }),
    ]);

    const requisiteData = contactRequisites.map((element) => {
      const bankInfo = contactBankDetail.filter((bankInfoElement) => bankInfoElement.ENTITY_ID === element.ID);
      const address = contactAddress
        .filter((addr) => addr.ENTITY_ID === element.ID)
        .map((addressElement) => ({ ...addressElement, ID: uuidv4() }));
      return { ...element, bankInfo, address };
    });

    const respData = contacts.map((contactElement) => {
      const requisiteElement = requisiteData.find((requisite) => requisite.ENTITY_ID === contactElement.ID);
      if (!requisiteElement) {
        return contactElement;
      }
      return {
        ...contactElement,
        requisiteId: requisiteElement.ID,
        address: requisiteElement.address,
        bankInfo: requisiteElement.bankInfo,
      };
    });

    res.status(200).json(respData);
  } catch (error) {
    res.status(500).json({ msg: 'Unable to fetch data' });
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<any>}
 */
export const createContact = async (req, res) => {
  try {
    const { data } = req.body;
    const { address, bankInfo, ...contactData } = data;

    const contactId = await api('crm.contact.add', { body: { fields: { ...contactData } } });

    if (bankInfo || address) {
      const requisiteId = await api('crm.requisite.add', {
        body: {
          fields: {
            ENTITY_TYPE_ID: 3,
            ENTITY_ID: contactId,
            PRESET_ID: 3,
            NAME: 'Detail',
          },
        },
      });

      await Promise.all([
        address?.map((element) =>
          api('crm.address.add', {
            body: {
              fields: {
                ENTITY_TYPE_ID: 8,
                ENTITY_ID: requisiteId,
                ...element,
              },
            },
          }),
        ),
        bankInfo?.map((element) =>
          api('crm.requisite.bankdetail.add', {
            body: {
              fields: {
                ENTITY_ID: requisiteId,
                NAME: 'Bank details',
                ...element,
              },
            },
          }),
        ),
      ]);
    }
    res.status(201).json({ msg: 'creation success' });
  } catch (error) {
    res.status(400).json({ msg: 'creation failed' });
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<any>}
 */
export const updateContact = async (req, res) => {
  try {
    const { requisiteId, address, bankInfo, ID, ...data } = req.body.data;

    if (!requisiteId && (address || bankInfo)) {
      const newRequisiteId = await api('crm.requisite.add', {
        body: {
          fields: {
            ENTITY_TYPE_ID: 3,
            ENTITY_ID: ID,
            PRESET_ID: 3,
            NAME: 'Detail',
          },
        },
      });
      handleDataUpdateContact(bankInfo, address, newRequisiteId);
    } else {
      handleDataUpdateContact(bankInfo, address, requisiteId);
    }
    await api('crm.contact.update', { body: { id: ID, fields: { ...data } } });
    res.status(200).json({ msg: 'update failed' });
  } catch (error) {
    res.status(400).json({ msg: 'update failed' });
  }
};

/**
 * @param req
 * @param res
 * @return {Promise<any>}
 */
export const deleteContact = async (req, res) => {
  try {
    const requisites = await api('crm.requisite.list', {
      body: { filter: { ENTITY_ID: req.body.contactId }, select: ['ID'] },
    });

    // delete requisite address and requisite bankdetail
    await Promise.all(requisites.map((requisite) => api('crm.requisite.delete', { body: { id: requisite.ID } })));

    await api('crm.contact.delete', {
      body: {
        id: parseInt(req.body.contactId),
      },
    }),
      res.status(200).json({ msg: 'delete success' });
  } catch (error) {
    res.status(400).json({ msg: 'delete failed' });
  }
};
