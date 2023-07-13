/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { IntegratingSystemType } from './types/types'
import { Validator } from './types/validators'

export const exactDateOfBirthUnknownConditional = [
  {
    action: 'hide',
    expression: '!values.exactDateOfBirthUnknown'
  }
]

export const isValidBirthDate = [
  {
    operation: 'isValidBirthDate'
  }
] satisfies Validator[]

export function getNationalIDValidators(configCase: string) {
  if (configCase === 'informant') {
    return [
      {
        operation: 'validIDNumber',
        parameters: ['NATIONAL_ID']
      },
      {
        operation: 'duplicateIDNumber',
        parameters: ['deceased.iD']
      },
      {
        operation: 'duplicateIDNumber',
        parameters: ['mother.iD']
      },
      {
        operation: 'duplicateIDNumber',
        parameters: ['father.iD']
      }
    ]
  } else {
    // mother
    return [
      {
        operation: 'validIDNumber',
        parameters: ['NATIONAL_ID']
      },
      {
        operation: 'duplicateIDNumber',
        parameters: ['father.iD']
      }
    ]
  }
}

export const hideIfNidIntegrationEnabled = [
  {
    action: 'hide',
    expression: `const nationalIdSystem =
          offlineCountryConfig &&
          offlineCountryConfig.systems.find(s => s.integratingSystemType === '${IntegratingSystemType.Mosip}');
          nationalIdSystem &&
          nationalIdSystem.settings.openIdProviderBaseUrl &&
          nationalIdSystem.settings.openIdProhideIfNidIntegrationDisabledviderClientId &&
          nationalIdSystem.settings.openIdProviderClaims;
      `
  }
]

export const informantBirthDateConditionals = [
  {
    action: 'disable',
    expression: 'values.exactDateOfBirthUnknown'
  },
  {
    action: 'disable',
    expression: `draftData?.informant?.fieldsModifiedByNidUserInfo?.includes('informantBirthDate')`
  }
]

export const informantFirstNameConditionals = [
  {
    action: 'disable',
    expression: `draftData?.informant?.fieldsModifiedByNidUserInfo?.includes('firstNamesEng')`
  }
]

export const informantFamilyNameConditionals = [
  {
    action: 'disable',
    expression: `draftData?.informant?.fieldsModifiedByNidUserInfo?.includes('familyNameEng')`
  }
]
