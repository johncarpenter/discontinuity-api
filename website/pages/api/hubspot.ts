import { NextApiRequest, NextApiResponse } from 'next'
import { AssociationTypes, Client } from '@hubspot/api-client'

/* eslint-disable import/no-anonymous-default-export */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  try {
    const TOKEN = process.env.HUBSPOT_TOKEN
    const hubspotClient = new Client({ accessToken: TOKEN })

    const { email, first, last, company, message } = req.body
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }
  
  

    const contactObj = {
      properties: {
        email: email,
        firstname: first,
        lastname: last,
        message: message,
        hubspot_owner_id: '378978467',
      },
    }
    

    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)
    
    if(company != null){
      
      const companyObj = {
        properties: {        
          name: company,
        },
      }
      const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create(companyObj)

      await hubspotClient.crm.companies.associationsApi.create(
        parseInt(createCompanyResponse.id),
        'contacts',
        parseInt(createContactResponse.id),
        [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: AssociationTypes.companyToContact,
            // AssociationTypes contains the most popular HubSpot defined association types
          },
        ]
      )

    }
    
    return res.status(201).json({ error: '' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
