'use client'
import React, { useEffect } from 'react'

export interface HubspotContactFormProps {
  region: string
  portalId: string
  formId: string
}

const HubspotContactForm = ({ region, portalId, formId }: HubspotContactFormProps) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/shell.js'
    document.body.appendChild(script)

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: '#hubspotForm',
        })
      }
    })
  }, [formId, portalId, region])

  return (
    <div>
      <div id="hubspotForm"></div>
    </div>
  )
}

export default HubspotContactForm
